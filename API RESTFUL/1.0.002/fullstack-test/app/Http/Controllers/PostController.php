<?php

namespace App\Http\Controllers;

use App\Author;
use App\Post;
use App\Tag;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;

class PostController extends Controller
{
    public function index() {
       /* $posts = DB::table('posts')
                ->join('authors', 'authors.id', '=', 'posts.author_id')
                ->select('posts.*', 'authors.name as author_name')
                ->get();
        $i = 0;

        foreach ($posts as $value) {
            $tag[] = Tag::find($value->id);
            $i++;
        }
       $posts = Post::all();

       foreach ($posts as $key => $value) {
           $posts_tags[$key] = array(
               'post'=>$value->find($key+1),
               'tags'=>$value->tags
           );
       }
         * $posts_tags[0]['tags'][1] -> Mostra a linha 1, array tags, posição 1
         * $posts_tags[0]['tags'] -> Mostra a linha 1, todas as tags
         * $posts_tags[0]['post'] -> Mostra a linha 1 e informações do post
         * $posts_tags[0] -> Mostra tudo da linha 1
         * $posts_tags -> Mostra tudo de todas as linhas
         */
        $posts = Post::with('author', 'tags' )->get();
        return response()->json(['Posts' => $posts], 201);
    }

    public function show($id) {
        $post = Post::find($id);
        $post->tags;

        return response()->json(['Post' => $post], 201);
    }

    public function store(Request $request) {

        $author = Author::add($request->name_author);

        $post = Post::create([
            'title' => $request->title, 'slug' => $request->slug,
            'body' => $request->body, 'image' => $request->image,
            'author_id' => $author->id
        ]);

        Tag::add($request->name_tag, $post);

        return response()->json(array('post'=>$post, 'author'=>$author, 'tags'=>$request->name_tag), 201);
    }

    public function update(Request $request, $id) {
        $data = $request->all();
        $post = Post::find($id);

        if($post) {
            $post->update($data);
            return response()->json(array('post'=>$post), 200);
        } else {
            return response()->json(array('data' => 'O poste não foi encontrado'), 204);
        }
    }
}

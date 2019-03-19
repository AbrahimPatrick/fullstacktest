<?php

namespace App\Http\Controllers;

use App\Author;
use App\Post;
use App\Services\ImageService;
use App\Tag;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use Illuminate\Database\QueryException;
use Symfony\Component\HttpFoundation\Response;
use Carbon\Carbon;

class PostController extends Controller
{
    /*
     * Private
     */
    public function index()
    {
        try {
            $posts = Post::orderBy('created_at', 'DESC')->with('author', 'tags')->get();
            $posts->makeHidden(["body", "slug", "image"]);
            return response()->json(['posts' => $posts], Response::HTTP_FOUND);
        } catch (QueryException $e) {
            return response()->json(['message' => 'Erro de conexão com o banco de dados.', 'class' => 'danger'], Response::HTTP_INTERNAL_SERVER_ERROR);
        }

    }


    public function show($id)
    {
        try {
            $post = Post::find($id);
            if ($post) {
                $post->makeHidden(["slug", 'published', 'created_at', 'updated_at']);
                $post->tags;
                $post->author;
                $post->tags = Tag::intToString($post->tags);

                return response()->json(['post' => $post], Response::HTTP_FOUND);
            } else {
                return response()->json(['message' => 'Post não encontrado.', 'class' => 'danger'], Response::HTTP_NOT_FOUND);
            }

        } catch (QueryException $e) {
            return response()->json(['message' => 'Erro de conexão com o banco de dados.', 'class' => 'danger'], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function store(Request $request)
    {

        try {
            $author = Author::add($request->name_author);

            if ($request->hasFile('image')) {
                $imageService = new ImageService();
                $urlImagem = $imageService->salvarImagem($request->image);
                $request->image = $urlImagem;
            } else {
                $urlImagem = ' ';
            }

            $post = Post::create([
                'title' => $request->title, 'slug' => str_slug($request->title, '-'),
                'body' => $request->body, 'image' => $urlImagem,
                'author_id' => $author->id
            ]);

            Tag::add($request->name_tag, $post);

            return response()->json(['post' => $post, 'author' => $author, 'tags' => $request->name_tag,
                'message' => 'Post criado com sucesso! Clique em publicar na lista de posts para deixar online.',
                'class' => 'success'], Response::HTTP_CREATED);
        } catch (QueryException $e) {
            return response()->json(['message' => 'Erro de conexão com o banco de dados.', 'class' => 'danger'], Response::HTTP_INTERNAL_SERVER_ERROR);
        }

    }

    public function update(Request $request, $id)
    {
        try {
            $post = Post::find($id);
            $post->tags;
            $author = Author::add($request->author);

            Tag::updateTags($post->tags, $request->tags, $post);

            if ($post) {
                if (!$request->hasFile('image')) {
                    $post->update($request->except('image'));
                    $post->author_id = $author->id;
                    $post->update();
                    return response()->json(['post' => $post, 'message' => 'Post atualizada com sucesso!', 'class' => 'success'], Response::HTTP_OK);
                } else {
                    $imageService = new ImageService();
                    $urlImagem = $imageService->salvarImagem($request->image);
                    $request->image = $urlImagem;
                    $post->update($request->except('image'));
                    $post->image = $urlImagem;
                    $post->author_id = $author->id;
                    $post->update();
                    return response()->json(['post' => $post, 'message' => 'Post atualizada com sucesso!', 'class' => 'success'], Response::HTTP_OK);
                }
            } else {
                return response()->json(['message' => 'O poste não foi encontrado', 'class' => 'danger'], Response::HTTP_NOT_FOUND);
            }
        } catch (QueryException $e) {
           return response()->json(['message' => 'Erro de conexão com o banco de dados.', 'class' => 'danger'], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function publish($id)
    {
        try {
            $post = Post::find($id);
            if ($post) {
                $post->published = 1;
                $post->update();
                return response()->json(['post' => $post, 'message' => 'O Post foi publicado com sucesso!', 'class' => 'success'], Response::HTTP_OK);
            } else {
                return response()->json(['message' => 'O poste não foi encontrado', 'class' => 'danger'], Response::HTTP_NOT_FOUND);
            }
        } catch (QueryException $e) {
            return response()->json(['message' => 'Erro de conexão com o banco de dados.', 'class' => 'danger'], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function unpublish($id)
    {
        try {
            $post = Post::find($id);
            if ($post) {
                $post->published = 0;
                $post->update();
                return response()->json(['post' => $post, 'message' => 'Post foi tirado do ar. Clique em publicar para retornar a ação.', 'class' => 'warning'], Response::HTTP_OK);
            } else {
                return response()->json(['message' => 'O poste não foi encontrado', 'class' => 'danger'], Response::HTTP_NOT_FOUND);
            }
        } catch (QueryException $e) {
            return response()->json(['message' => 'Erro de conexão com o banco de dados.', 'class' => 'danger'], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function removeTag($id, $tag_id)
    {
        try {
            $post = Post::find($id);
            $tag = $post->tags()->detach($tag_id);

            if ($tag) {
                return response()->json(['tag' => $tag], Response::HTTP_ACCEPTED);
            } else {
                return response()->json(['message' => 'A tag não foi encontrada', 'class' => 'danger'], Response::HTTP_NOT_FOUND);
            }
        } catch (QueryException $e) {
            return response()->json(['message' => 'Erro de conexão com o banco de dados.', 'class' => 'danger'], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function adicionaTag(Request $request, $id)
    {
        try {
            $post = Post::find($id);
            $tag = Tag::add($request->name_tag, $post);

            if ($tag) {
                return response()->json(['tag' => $tag], Response::HTTP_ACCEPTED);
            } else {
                return response()->json(['message' => 'A tag não foi encontrada', 'class' => 'danger'], Response::HTTP_NOT_FOUND);
            }
        } catch (QueryException $e) {
            return response()->json(['message' => 'Erro de conexão com o banco de dados.', 'class' => 'danger'], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function listarTags()
    {
        try {
            $tags = DB::table('tags')->select('id', 'name')->get();

            $tags = Tag::intToString($tags);

            return response()->json(['suggestions' => $tags], 201);
        } catch (QueryException $e) {
            return response()->json(['message' => 'Erro de conexão com o banco de dados.', 'class' => 'danger'], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /*
     * Public
     */

    public function publicList($tag = null)
    {
        if ($tag) {
            try {
                $posts = Post::orderBy('created_at', 'DESC')->with('author', 'tags')->where('published', '=', '0')->get();
                $posts->makeHidden(["image"]);
                foreach ($posts as $key => $value) {
                    //$posts[$key]->date = Carbon::parse($posts[$key]->created_at)->format('d/m/Y');
                    $posts[$key]->body = str_limit($posts[$key]->body, 400, '...');
                }

                return response()->json(['posts' => $posts], Response::HTTP_FOUND);
            } catch (QueryException $e) {
                return response()->json(['message' => 'Erro de conexão com o banco de dados.', 'class' => 'danger'], Response::HTTP_INTERNAL_SERVER_ERROR);
            }
        } else {
            try {
                $posts = Post::orderBy('created_at', 'DESC')->with('author', 'tags')->where('published', '=', '1')->get();
                $posts->makeHidden(["image"]);
                foreach ($posts as $key => $value) {
                    $posts[$key]->date = Carbon::parse($posts[$key]->created_at)->format('Y-m-d');
                    $posts[$key]->body = str_limit($posts[$key]->body, 400, '...');
                }

                return response()->json(['posts' => $posts], Response::HTTP_FOUND);
            } catch (QueryException $e) {
                return response()->json(['message' => 'Erro de conexão com o banco de dados.', 'class' => 'danger'], Response::HTTP_INTERNAL_SERVER_ERROR);
            }
        }
    }

    public function publicPost($slug)
    {
        try {
            $post = DB::table('posts')->where('published', '=', '1')->where('slug', '=', $slug)->first();
            $post = Post::find($post->id);
            if ($post) {
                $post->makeHidden(['updated_at']);
                $post->tags;
                $post->author;
                $post->date = Carbon::parse($post->created_at)->format('Y-m-d');

                return response()->json(['post' => $post], Response::HTTP_FOUND);
            } else {
                return response()->json(['message' => 'Post não encontrado.', 'class' => 'danger'], Response::HTTP_NOT_FOUND);
            }

        } catch (QueryException $e) {
            return response()->json(['message' => 'Erro de conexão com o banco de dados.', 'class' => 'danger'], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}

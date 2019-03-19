<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class PostController extends Controller
{
    public function index() {
        //
    }

    public function show($id) {
        //
    }

    public function store(Request $request) {
        $post = $request->input('title', 'slug', 'body', 'image');
        $author = $request->input('name_author');
        $tag = $request->input('name_tag');
    }

    public function update(Request $request, $id) {
        //
    }
}

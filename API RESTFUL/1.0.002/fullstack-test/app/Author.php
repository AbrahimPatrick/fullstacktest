<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Author extends Model
{
    protected $fillable = [
        'name'
    ];

    public static function add($name)
    {
        if(!Author::where('name', '=' , $name)->count()) {
            $author = new Author;
            $author->name = $name;
            $author->save();
        } else {
            $author = Author::where('name', '=' , $name)->first();
        }

        return $author;
    }
}

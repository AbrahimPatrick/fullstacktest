<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Author extends Model
{
    protected $fillable = [
        'name', 'id'
    ];

    protected $hidden = [
        'created_at', 'updated_at'
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

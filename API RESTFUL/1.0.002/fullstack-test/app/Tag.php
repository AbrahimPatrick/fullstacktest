<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Tag extends Model
{
    protected $fillable = [
        'name'
    ];

    protected static function add($tags, Post $post)
    {
        foreach($tags as $value)
        {
            if(!Tag::where('name', $value)->count()) {
                $tag = new Tag;
                $tag->name = $value;
                $tag->save();
            } else {
                $tag = Tag::where('name', $value)->first();
            }

            $post->addTag($tag);
        }
    }
}

<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\App;

class Post extends Model
{
    protected $fillable = [
        'title', 'slug', 'body', 'image', 'published', 'author_id'
    ];

    protected $hidden = [
        'author_id'
    ];

    public function tags()
    {
        return $this->belongsToMany('App\Tag', 'post_tag', 'post_id', 'tag_id');
    }

    public function author()
    {
        return $this->belongsTo('App\Author');
    }

    public function addTag(Tag $tag)
    {
        return $this->tags()->save($tag);
    }
}

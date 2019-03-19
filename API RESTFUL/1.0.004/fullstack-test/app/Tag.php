<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Tag extends Model
{
    protected $fillable = [
        'name'
    ];

    protected $hidden = [
        'created_at', 'updated_at', 'pivot'
    ];

    protected static function add($tags, Post $post)
    {
        $tags_decod = json_decode($tags);

        foreach ($tags_decod as $key => $value) {
                if (!Tag::where('name', $value->text)->count()) {
                    $tag = new Tag;
                    $tag->name = $value->text;
                    $tag->save();
                } else {
                    $tag = Tag::where('name', $value->text)->first();
                }

                $post->addTag($tag);

        }
    }


    protected static function updateTags($current, $new, Post $post)
    {
        $array1 = array();
        $array2 = array();
        $array3 = array();

        foreach ($current as $key => $value) {
            array_push($array1, $value->id);
        }

        $tags_decod = json_decode($new);

        foreach ($tags_decod as $key => $value) {
            //dd($value);
            array_push($array2, $value->id);
            array_push($array3, $value->text);
        }

        foreach ($array1 as $key => $value){
            if(!in_array ( $value, $array2 )) {
                $post->tags()->detach($value);
                unset($array1[$key]);
            }
        }

        foreach ($array2 as $key => $value){
            if(!in_array ( $value, $array1 )) {
                if (!Tag::where('id', $value)->count()) {
                    //com erro aqui
                    $tag = new Tag;
                    $tag->name = $array3[$key];
                    $tag->save();
                } else {
                    //funcionando
                    $tag = Tag::where('id', $value)->first();
                }

                $post->addTag($tag);
            }
        }
    }

    protected function intToString($tags){
        foreach ($tags as $key => $value) {
            $tags[$key]->id = strval($value->id);
            $tags[$key]->text = $value->name;
        }
        return $tags;
    }
}

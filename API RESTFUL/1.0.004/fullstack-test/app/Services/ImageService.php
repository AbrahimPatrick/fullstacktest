<?php

namespace App\Services;

use Intervention\Image\Facades\Image;

class ImageService
{
    public function salvarImagem($imagem)
    {
        $nomeImagem = time() . '.' . $imagem->extension();
        $path = public_path('storage/uploads/' . $nomeImagem);
        Image::make($imagem)->resize(1100, 490 )->save($path);
        return asset('storage/uploads/' . $nomeImagem);
    }
}

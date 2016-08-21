<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Items extends Model
{
    //


    protected $casts = [

        'Id' => 'integer',
        'Type'=> 'string',
        'Url'=> 'string',


    ];


    public function getUpdatedAtAttribute($value)
    {
        return Carbon::parse($value)->format('c');
    }

    public function getCreatedAtAttribute($value)
    {
        return Carbon::parse($value)->format('c');
    }

}

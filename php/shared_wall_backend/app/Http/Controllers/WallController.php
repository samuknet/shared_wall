<?php
/**
 * Created by PhpStorm.
 * User: JoeWood
 * Date: 21/08/2016
 * Time: 18:10
 */

namespace App\Http\Controllers;


use App\Items;



class WallController extends RestController {



    protected $modelType = 'App\items';
    protected $postFields = ['id', 'type', 'url'];
    protected $putFields = ['id', 'type', 'url'];
    protected $allowedFilters = ['type',];
    protected $exceptionCaught;
    protected $errorList = [];

    protected $allowedSearchFilters = [
        'type',

    ];

    public function store(Request $request)
    {
        return $this->rootStore($request);
    }

    public function retrieveItems(){




        $items = Items::all();


        header("Access-Control-Allow-Origin: *");
        return response()->json($items);

    }


    public function storeImage($imageUrl){






    }

    public function callback(){


    return "hello world";
}




}
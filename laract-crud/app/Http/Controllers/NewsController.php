<?php

namespace App\Http\Controllers;

use App\Http\Resources\NewsCollection;
use App\Models\News;
use Illuminate\Contracts\Encryption\DecryptException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Crypt;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;

class NewsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $news = new NewsCollection(News::paginate(8));

        return Inertia::render('Hompage', [
            'title' => 'News',
            'testing' => 'ReactJs With laravel',
            'news' => $news
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validator =  Validator::make($request->all(), [
            'title' => 'required',
            'description' => 'required',
            'category' => 'required',
            'email' =>  'email'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'error' => $validator->errors(),
            ], 400);
        }

        $news = new News;
        $news->title = $request->input('title');
        $news->description = $request->input('description');
        $news->category = $request->input('category');
        $news->author = auth()->user()->email;
        $news->save();


        return redirect()->back()->with('message', 'Berita Berhasil Dibuat');
    }

    /**
     * Display the specified resource.
     */
    public function show(News $news)
    {
        $myNews = $news::where('author', auth()->user()->email)->get();

        $encryptId = [];
        foreach ($myNews as $newsItem) {
            $encryptId[] = encrypt($newsItem->id);
        }
        return Inertia::render('Dashboard', [
            'myNews' => $myNews,
            'encId' => $encryptId
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(News $news)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, News $news)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request)
    {
        $decrypt = decrypt($request->id);
        $news = News::find($decrypt);
        $news->delete();


        return redirect()->back()->with('message', 'Berita berhasil di hapus');
    }
}

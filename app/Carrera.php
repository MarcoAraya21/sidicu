<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Carrera extends Model
{
    protected $fillable = ['nombre', 'cod_demre', 'titulo', 'escuela_id'];

    public function escuela()
    {
        return $this->belongsTo('App\Escuela');
    }

    public function usuarios()
    {
        return $this->hasMany('App\Usuario');
    }
    public function plan_estudios()
    {
        return $this->hasMany('App\PlanEstudio');
    }
}

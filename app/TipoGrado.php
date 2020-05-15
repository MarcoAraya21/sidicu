<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class TipoGrado extends Model
{
    protected $fillable = ['nombre'];

    public function plan_estudios()
    {
        return $this->hasMany('App\PlanEstudio');
    }
}

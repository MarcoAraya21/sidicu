<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class NivelCompetenciaAsignatura extends Model
{
    public function nivel_competencia()
    {
        return $this->belongsTo('App\NivelCompetencia');
    }
}

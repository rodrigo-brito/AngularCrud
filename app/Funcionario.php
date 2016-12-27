<?php
namespace App;

use Illuminate\Database\Eloquent\Model;

class Funcionario extends Model
{
    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'funcionario';
    protected $fillable = ['nome', 'telefone', 'salario', 'email'];
}
<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;

class SommelierController extends AbstractController
{
    /**
     * @Route("/sommelier", name="sommelier")
     */
    public function index()
    {
        return $this->render('sommelier/index.html.twig', [
            'controller_name' => 'SommelierController',
        ]);
    }
}

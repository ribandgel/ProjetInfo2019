<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;

class InfoController extends AbstractController
{
    /**
     * @Route("/info", name="info")
     */
    public function index()
    {
        return $this->render('info/index.html.twig', [
            'controller_name' => 'InfoController',
        ]);
    }
}

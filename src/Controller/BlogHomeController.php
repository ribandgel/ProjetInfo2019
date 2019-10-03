<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;

class BlogHomeController extends AbstractController
{
    /**
     * @Route("/blog/home", name="blog_home")
     */
    public function index()
    {
        return $this->render('blog_home/index.html.twig', [
            'controller_name' => 'BlogHomeController',
        ]);
    }
}

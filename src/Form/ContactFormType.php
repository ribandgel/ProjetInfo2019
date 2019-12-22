<?php

namespace App\Form;

use App\Entity\Contact;
use Symfony\Component\Form\Extension\Core\Type\EmailType;
use Symfony\Component\Form\Extension\Core\Type\SubmitType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\TextareaType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class ContactFormType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('firstName', TextType::class, [
                'attr' => [
                    'placeholder' => "Entrez votre nom"
                ]
            ])
            ->add('lastName', TextType::class, [
                'attr' => [
                    'placeholder' => "Entrez votre prénom"
                ]
            ])
            ->add('emailAdr', EmailType::class, [
                'attr' => [
                    'placeholder' => "Entrez votre adresse mail"
                ]
            ])
            ->add('message', TextareaType::class, [
                'attr' => [
                    'placeholder' => "Entrez votre message"
                ]
            ])
        ;
    }

    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults([
            'data_class' => Contact::class
        ]);
    }
}

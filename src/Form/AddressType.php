<?php
/**
 * Created by PhpStorm.
 * User: Andgel
 * Date: 29/09/2019
 * Time: 20:01
 */
namespace App\Form;

use App\Entity\Address;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class AddressType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('country', TextType::class)
            ->add('city', TextType::class)
            ->add('zipCode', TextType::class)
            ->add('addressLines', TextType::class)
        ;
    }

    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults([
            'label' => false,
            'data_class' => Address::class,
        ]);
    }
}
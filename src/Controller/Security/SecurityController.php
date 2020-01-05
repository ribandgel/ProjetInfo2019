<?php


namespace App\Controller\Security;


use App\Entity\User;
use App\Form\RegistrationForm;
use App\Repository\UserRepository;
use Doctrine\ORM\EntityManagerInterface;
use http\Exception\RuntimeException;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;
use Symfony\Component\Security\Http\Authentication\AuthenticationUtils;
use Symfony\Contracts\Translation\TranslatorInterface;

class SecurityController extends AbstractController
{
    /**
     * @Route("/login", name="app_login")
     * @param AuthenticationUtils $authenticationUtils
     * @return Response
     */
    public function login(AuthenticationUtils $authenticationUtils, UserRepository $repository): Response
    {
        $users = $repository->findAll();
        foreach ($users as $user) {
            if ($user->hasRoles(['ADMIN'])) {
                // get the login error if there is one
                $error = $authenticationUtils->getLastAuthenticationError();
                // last username entered by the user
                $lastUsername = $authenticationUtils->getLastUsername();

                return $this->render('security/login.html.twig', [
                    'last_username' => $lastUsername,
                    'error' => $error
                ]);
            }
        }
        return $this->redirectToRoute('app_first_admin_registration');
    }

    /**
     * @Route("/first_admin_registration", name="app_first_admin_registration")
     * @param Request $request
     * @param UserRepository $repository
     * @param EntityManagerInterface $manager
     * @param UserPasswordEncoderInterface $encoder
     * @param TranslatorInterface $translator
     * @return Response
     */
    public function firstAdminRegistration(Request $request,
                                           UserRepository $repository,
                                           EntityManagerInterface $manager,
                                           UserPasswordEncoderInterface $encoder,
                                           TranslatorInterface $translator)
    {
        $users = $repository->findAll();
        foreach ($users as $user) {
            if ($user->hasRoles(['ADMIN'])) {
                $this->addFlash('danger','An user with admin role already exist');
                return $this->redirectToRoute('home');
            }
        }
        $registrationForm = $this->createForm(RegistrationForm::class);
        $registrationForm = $registrationForm->handleRequest($request);
        if ($registrationForm->isSubmitted() && $registrationForm->isValid()) {
            $user = $registrationForm->getData();
            if (!$user instanceof User)
                throw new RuntimeException('An error has occured');
            $user->setRoles(['ADMIN']);
            $password = $user->getPassword();
            $encryptedPassword = $encoder->encodePassword($user, $password);
            $user->setPassword($encryptedPassword);

            $manager->persist($user);
            $manager->flush();

            return $this->redirectToRoute('app_login');

        }
        return $this->render('security/register.html.twig', [
            'registrationForm' => $registrationForm->createView()
        ]);
    }
}
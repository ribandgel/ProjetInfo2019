<?php

namespace App\Command;

use Symfony\Component\Console\Command\Command;
use App\Entity\Address;
use App\Entity\Producer;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\Console\Style\SymfonyStyle;

class CsvImportCommand extends Command {

    protected static $defaultName = 'csv:import';

    /**
     * @var EntityManagerInterface
     */
    private $em;

    public function __construct(EntityManagerInterface $em)
    {
        parent::__construct();
        $this->em = $em;
    }

    protected function configure() {
        $this
            ->setDescription('import .csv data file')
        ;
    }

    protected function execute(InputInterface $input, OutputInterface $output) {
        $io = new SymfonyStyle($input, $output);

        $io->title('Attempting to import csv file...');

        $producer = (new Producer())
            ->setName('producer1-TEST')
            ->setPhone('phoneTEST')
            ->setLatitude('latitudeTEST')
            ->setLongitude('longitudeTEST')
        ;

        $this->em->persist($producer);

        $address = (new Address())
            ->setCountry('country-TEST')
            ->setCity('cityTEST')
            ->setZipCode('ZIPCODE-TEST')
            ->setAddressLines('adrLineTEST')
        ;

        $this->em->persist($address);


        $producer->setAddress($address);

        $this->em->flush();

        $io->success('Everything went well!');
    }
}
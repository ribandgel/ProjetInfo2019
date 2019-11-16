<?php

namespace App\Command;

use App\Entity\Variety;
use App\Entity\Designation;
use App\Entity\Color;
use App\Entity\Wine;
use League\Csv\Reader;
use League\Csv\Statement;
use Symfony\Component\Console\Command\Command;
use App\Entity\Address;
use App\Entity\Producer;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\Console\Style\SymfonyStyle;

/**
 * Class CsvImportCommand
 * @package src\ConsoleCommand
 */
class CsvImportCommand extends Command {

    //Before importing data :
    //clear out tables in MySQL tables if they already have some data
    //then run: php bin/console doctrine:schema:update --force

    //THE COMMAND TO TYPE TO GET THE DATA FROM THE CSV FILE, THAT IS IN THE DATA FOLDER, INTO THE DATA BASE IS:
    // php bin/console csv:import

    //if issue with League, might need to run the command:
    //composer require league/csv before
    //https://csv.thephpleague.com/


    /**
     * @var EntityManagerInterface
     */
    private $em;

    /**
     * CsvImportCommand constructor.
     *
     * @param EntityManagerInterface $em
     *
     * @throws \Symfony\Component\Console\Exception\LogicException
     */
    public function __construct(EntityManagerInterface $em)
    {
        parent::__construct();
        $this->em = $em;
    }

    /**
     * Configure
     * @throws \Symfony\Component\Console\Exception\InvalidArgumentException
     */
    protected function configure() {
        $this
            ->setName('csv:import')
            ->setDescription('Imports the mock CSV data file')
        ;
    }

    /**
     * @param InputInterface  $input
     * @param OutputInterface $output
     *
     * @return void
     * @throws \Doctrine\ORM\NonUniqueResultException
     */
    protected function execute(InputInterface $input, OutputInterface $output)
    {

        $io = new SymfonyStyle($input, $output);
        $io->title('Attempting to import csv file...');

        $reader = Reader::createFromPath('%kernel.root_dir%/../src/Data/DB-LIFPROJET.csv');

        $reader->setHeaderOffset(0);

        $stmt = (new Statement())
            ->offset(0)
        ;

        $results = $stmt->process($reader);

        foreach($results as $row)
        {

            $address = $this->em->getRepository(Address::class)
                ->findOneBy([
                    'city' => $row['city'],
                    'addressLines' => $row['addressLines']
                ]);
            if ($address === null) {
                $address = (new Address())
                    ->setCountry($row['country'])
                    ->setCity($row['city'])
                    ->setZipCode($row['zipCode'])
                    ->setAddressLines($row['addressLines'])
                ;
                $this->em->persist($address);
                $this->em->flush();
            }

            //checks if this producer already exist in the DB
            $producer = $this->em->getRepository(Producer::class)
                ->findOneBy([
                    'name' => $row['producer_name'],
                    'latitude' => $row['latitude'],
                    'longitude' => $row['longitude']
                ]);
            if ($producer === null) {
                // if does not exist we create one
                $producer = (new Producer())
                    ->setName($row['producer_name'])
                    ->setPhone($row['phone'])
                    ->setLatitude($row['latitude'])
                    ->setLongitude($row['longitude'])
                    ->setWebsite($row['website'])
                    ->setAddress($address)
                ;
                $this->em->persist($producer);
                $this->em->flush();
            }


            $designation = $this->em->getRepository(Designation::class)
                ->findOneBy([
                    'name' => $row['designation_name']
                ]);
            if ($designation === null) {
                $designation = (new Designation())
                    ->setName($row['designation_name'])
                ;
                $this->em->persist($designation);
                $this->em->flush();
            }


            $color = $this->em->getRepository(Color::class)
                ->findOneBy([
                    'color' => $row['color']
                ]);
            if ($color === null) {
                $color = (new Color())
                    ->setColor($row['color'])
                ;
                $this->em->persist($color);
                $this->em->flush();
            }


            $variety = $this->em->getRepository(Variety::class)
                ->findOneBy([
                    'name' => $row['variety_name']
                ]);
            if ($variety === null) {
                $variety = (new Variety())
                    ->setName($row['variety_name'])
                ;
                $this->em->persist($variety);
                $this->em->flush();
            }


            $wine = (new Wine())
                ->setDesignation($designation)
                ->setColor($color)
                ->setVariety($variety)
                ->setProducer($producer)
            ;
            $this->em->persist($wine);
        }

        $this->em->flush();

        $io->success('Everything went well!');
    }
}
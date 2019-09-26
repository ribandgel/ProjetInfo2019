<?php

namespace App\Repository;

use App\Entity\Beverage;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Common\Persistence\ManagerRegistry;

/**
 * @method Beverage|null find($id, $lockMode = null, $lockVersion = null)
 * @method Beverage|null findOneBy(array $criteria, array $orderBy = null)
 * @method Beverage[]    findAll()
 * @method Beverage[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class BeverageRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Beverage::class);
    }

    // /**
    //  * @return Beverage[] Returns an array of Beverage objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('b')
            ->andWhere('b.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('b.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?Beverage
    {
        return $this->createQueryBuilder('b')
            ->andWhere('b.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}

<?php

namespace App\Repository;

use App\Entity\Winery;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Common\Persistence\ManagerRegistry;

/**
 * @method Winery|null find($id, $lockMode = null, $lockVersion = null)
 * @method Winery|null findOneBy(array $criteria, array $orderBy = null)
 * @method Winery[]    findAll()
 * @method Winery[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class WineryRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Winery::class);
    }

    // /**
    //  * @return Winery[] Returns an array of Winery objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('w')
            ->andWhere('w.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('w.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?Winery
    {
        return $this->createQueryBuilder('w')
            ->andWhere('w.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}

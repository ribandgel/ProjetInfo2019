<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Core\Annotation\ApiResource;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * @ApiResource(
 *     collectionOperations={"get"},
 *     itemOperations={"get"},
 *     normalizationContext={"groups"={"beverage"}}
 * ))
 * @ORM\Entity(repositoryClass="App\Repository\BeverageRepository")
 */
class Beverage
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @Groups("beverage")
     * @ORM\Column(type="string", length=255)
     */
    private $name;

    /**
     * @Groups("beverage")
     * @ORM\ManyToOne(targetEntity="App\Entity\Producer", inversedBy="beverages")
     * @ORM\JoinColumn(nullable=false)
     */
    private $producer;



    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): self
    {
        $this->name = $name;

        return $this;
    }

    public function getProducer(): ?Producer
    {
        return $this->producer;
    }

    public function setProducer(?Producer $producer): self
    {
        $this->producer = $producer;

        return $this;
    }


}

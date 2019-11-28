<?php

namespace App\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;


/**
 * @ORM\Entity(repositoryClass="App\Repository\WineRepository")
 */
class Wine
{

    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\Designation", inversedBy="wines")
     * @ORM\JoinColumn(nullable=false)
     */
    private $designation;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\Color", inversedBy="wines")
     * @ORM\JoinColumn(nullable=false)
     */
    private $color;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\Variety", inversedBy="wines")
     * @ORM\JoinColumn(nullable=false)
     */
    private $variety;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\Producer", inversedBy="wines")
     * @ORM\JoinColumn(nullable=false)
     */
    private $producer;

    public function __construct()
    {
        $this->designation = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }


    /**
     * @return Collection|Designation[]
     */
    public function getDesignation(): Collection
    {
        return $this->designation;
    }

    public function setDesignation(?Designation $designation): self
    {
        $this->designation=$designation;
        return $this;
    }

    public function getColor(): ?Color
    {
        return $this->color;
    }

    public function setColor(?Color $color): self
    {
        $this->color = $color;

        return $this;
    }

    public function getVariety(): ?Variety
    {
        return $this->variety;
    }

    public function setVariety(?Variety $variety): self
    {
        $this->variety = $variety;

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

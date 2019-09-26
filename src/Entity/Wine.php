<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass="App\Repository\WineRepository")
 */
class Wine extends Beverage
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="date")
     */
    private $year;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\Winery", inversedBy="wines")
     * @ORM\JoinColumn(nullable=false)
     */
    private $winery;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getYear(): ?\DateTimeInterface
    {
        return $this->year;
    }

    public function setYear(\DateTimeInterface $year): self
    {
        $this->year = $year;

        return $this;
    }

    public function getWinery(): ?Winery
    {
        return $this->winery;
    }

    public function setWinery(?Winery $winery): self
    {
        $this->winery = $winery;

        return $this;
    }
}

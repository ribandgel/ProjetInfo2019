<?php

namespace App\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
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
     * @ORM\ManyToOne(targetEntity="App\Entity\Winery", inversedBy="wines")
     * @ORM\JoinColumn(nullable=false)
     */
    private $winery;

    /**
     * @ORM\ManyToMany(targetEntity="App\Entity\WineCategory", inversedBy="wines")
     */
    private $category;

    public function __construct()
    {
        $this->category = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
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

    /**
     * @return Collection|WineCategory[]
     */
    public function getCategory(): Collection
    {
        return $this->category;
    }

    public function addCategory(WineCategory $category): self
    {
        if (!$this->category->contains($category)) {
            $this->category[] = $category;
        }

        return $this;
    }

    public function removeCategory(WineCategory $category): self
    {
        if ($this->category->contains($category)) {
            $this->category->removeElement($category);
        }

        return $this;
    }
}

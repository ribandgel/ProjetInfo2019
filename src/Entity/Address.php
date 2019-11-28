<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Core\Annotation\ApiResource;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * @ApiResource(
 *     collectionOperations={"get"},
 *     itemOperations={"get"},
 *     normalizationContext={"groups"="address"}
 * )
 * @ORM\Entity(repositoryClass="App\Repository\AddressRepository")
 */
class Address
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @Groups("address")
     * @ORM\Column(type="string", length=255)
     */
    private $country;

    /**
     * @Groups("address")
     * @ORM\Column(type="string", length=255)
     */
    private $city;

    /**
     * @Groups("address")
     * @ORM\Column(type="string", length=255)
     */
    private $zipCode;

    /**
     * @Groups("address")
     * @ORM\Column(type="text")
     */
    private $addressLines;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getCountry(): ?string
    {
        return $this->country;
    }

    public function setCountry(string $country): self
    {
        $this->country = $country;

        return $this;
    }

    public function getCity(): ?string
    {
        return $this->city;
    }

    public function setCity(string $city): self
    {
        $this->city = $city;

        return $this;
    }

    public function getZipCode(): ?string
    {
        return $this->zipCode;
    }

    public function setZipCode(string $zipCode): self
    {
        $this->zipCode = $zipCode;

        return $this;
    }

    public function getAddressLines(): ?string
    {
        return $this->addressLines;
    }

    public function setAddressLines(string $addressLines): self
    {
        $this->addressLines = $addressLines;

        return $this;
    }
}

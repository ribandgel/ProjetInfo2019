<?php

namespace App\Entity;

use Symfony\Component\Validator\Constraints as Assert;

class Contact
{
    /**
     * @var string|null
     * @Assert\Length(max=100)
     */
    private $firstName;

    /**
     * @var string|null
     * @Assert\Length(max=100)
     */
    private $lastName;

    /**
     * @var string|null
     * @Assert\NotBlank()
     * @Assert\Email()
     */
    private $emailAdr;

    /**
     * @var string|null
     * @Assert\NotBlank()
     * @Assert\Length(max=550)
     */
    private $message;

    /**
     * @return string|null
     */
    public function getFirstName(): ?string
    {
        return $this->firstName;
    }

    /**
     * @param string|null $firstName
     * @return Contact
     */
    public function setFirstName(?string $firstName): Contact
    {
        $this->firstName = $firstName;
        return $this;
    }

    /**
     * @return string|null
     */
    public function getLastName(): ?string
    {
        return $this->lastName;
    }

    /**
     * @param string|null $lastName
     * @return Contact
     */
    public function setLastName(?string $lastName): Contact
    {
        $this->lastName = $lastName;
        return $this;
    }

    /**
     * @return string|null
     */
    public function getEmailAdr(): ?string
    {
        return $this->emailAdr;
    }

    /**
     * @param string|null $emailAdr
     * @return Contact
     */
    public function setEmailAdr(?string $emailAdr): Contact
    {
        $this->emailAdr = $emailAdr;
        return $this;
    }

    /**
     * @return string|null
     */
    public function getMessage(): ?string
    {
        return $this->message;
    }

    /**
     * @param string|null $message
     * @return Contact
     */
    public function setMessage(?string $message): Contact
    {
        $this->message = $message;
        return $this;
    }
}

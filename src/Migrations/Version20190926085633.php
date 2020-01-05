<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20190926085633 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('CREATE TABLE address (id INT AUTO_INCREMENT NOT NULL, country VARCHAR(255) NOT NULL, city VARCHAR(255) NOT NULL, zip_code VARCHAR(255) NOT NULL, address_lines LONGTEXT NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ENGINE = InnoDB');
        $this->addSql('CREATE TABLE beverage (id INT AUTO_INCREMENT NOT NULL, name VARCHAR(255) NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ENGINE = InnoDB');
        $this->addSql('CREATE TABLE professional (id INT AUTO_INCREMENT NOT NULL, address_id INT NOT NULL, name VARCHAR(255) NOT NULL, UNIQUE INDEX UNIQ_B3B573AAF5B7AF75 (address_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ENGINE = InnoDB');
        //$this->addSql('CREATE TABLE wine (id INT AUTO_INCREMENT NOT NULL, winery_id INT NOT NULL, name VARCHAR(255) NOT NULL, year DATE NOT NULL, INDEX IDX_560C646832FAE8E8 (winery_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ENGINE = InnoDB');
        //$this->addSql('CREATE TABLE wine_category (id INT AUTO_INCREMENT NOT NULL, color VARCHAR(255) NOT NULL, variety VARCHAR(255) DEFAULT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ENGINE = InnoDB');
        //$this->addSql('CREATE TABLE winery (id INT AUTO_INCREMENT NOT NULL, address_id INT NOT NULL, name VARCHAR(255) NOT NULL, phone VARCHAR(255) NOT NULL, UNIQUE INDEX UNIQ_92F2D2F1F5B7AF75 (address_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ENGINE = InnoDB');
        //$this->addSql('ALTER TABLE professional ADD CONSTRAINT FK_B3B573AAF5B7AF75 FOREIGN KEY (address_id) REFERENCES address (id)');
        //$this->addSql('ALTER TABLE wine ADD CONSTRAINT FK_560C646832FAE8E8 FOREIGN KEY (winery_id) REFERENCES winery (id)');
        //$this->addSql('ALTER TABLE winery ADD CONSTRAINT FK_92F2D2F1F5B7AF75 FOREIGN KEY (address_id) REFERENCES address (id)');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE professional DROP FOREIGN KEY FK_B3B573AAF5B7AF75');
        //$this->addSql('ALTER TABLE winery DROP FOREIGN KEY FK_92F2D2F1F5B7AF75');
        //$this->addSql('ALTER TABLE wine DROP FOREIGN KEY FK_560C646832FAE8E8');
        $this->addSql('DROP TABLE address');
        $this->addSql('DROP TABLE beverage');
        $this->addSql('DROP TABLE professional');
        //$this->addSql('DROP TABLE wine');
        //$this->addSql('DROP TABLE wine_category');
        //$this->addSql('DROP TABLE winery');
    }
}

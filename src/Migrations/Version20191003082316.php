<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20191003082316 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

//        $this->addSql('CREATE TABLE wine_wine_category (wine_id INT NOT NULL, wine_category_id INT NOT NULL, INDEX IDX_CD7E6BDD28A2BD76 (wine_id), INDEX IDX_CD7E6BDD99DC0822 (wine_category_id), PRIMARY KEY(wine_id, wine_category_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ENGINE = InnoDB');
//        $this->addSql('ALTER TABLE wine_wine_category ADD CONSTRAINT FK_CD7E6BDD28A2BD76 FOREIGN KEY (wine_id) REFERENCES wine (id) ON DELETE CASCADE');
//        $this->addSql('ALTER TABLE wine_wine_category ADD CONSTRAINT FK_CD7E6BDD99DC0822 FOREIGN KEY (wine_category_id) REFERENCES wine_category (id) ON DELETE CASCADE');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

//        $this->addSql('DROP TABLE wine_wine_category');
    }
}

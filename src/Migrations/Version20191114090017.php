<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20191114090017 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        //$this->addSql('DROP TABLE wine_designation');
        $this->addSql('ALTER TABLE wine ADD designation_id INT NOT NULL');
        $this->addSql('ALTER TABLE wine ADD CONSTRAINT FK_560C6468FAC7D83F FOREIGN KEY (designation_id) REFERENCES designation (id)');
        $this->addSql('CREATE INDEX IDX_560C6468FAC7D83F ON wine (designation_id)');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

//        $this->addSql('CREATE TABLE wine_designation (wine_id INT NOT NULL, designation_id INT NOT NULL, INDEX IDX_2DDF4CDFAC7D83F (designation_id), INDEX IDX_2DDF4CD28A2BD76 (wine_id), PRIMARY KEY(wine_id, designation_id)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB COMMENT = \'\' ');
//        $this->addSql('ALTER TABLE wine_designation ADD CONSTRAINT FK_2DDF4CD28A2BD76 FOREIGN KEY (wine_id) REFERENCES wine (id) ON UPDATE NO ACTION ON DELETE CASCADE');
//        $this->addSql('ALTER TABLE wine_designation ADD CONSTRAINT FK_2DDF4CDFAC7D83F FOREIGN KEY (designation_id) REFERENCES designation (id) ON UPDATE NO ACTION ON DELETE CASCADE');
        $this->addSql('ALTER TABLE wine DROP FOREIGN KEY FK_560C6468FAC7D83F');
        $this->addSql('DROP INDEX IDX_560C6468FAC7D83F ON wine');
        $this->addSql('ALTER TABLE wine DROP designation_id');
    }
}

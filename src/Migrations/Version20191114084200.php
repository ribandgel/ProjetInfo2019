<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20191114084200 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE wine_wine_category DROP FOREIGN KEY FK_CD7E6BDD99DC0822');
        $this->addSql('ALTER TABLE beverage DROP FOREIGN KEY FK_3D8CACBB32FAE8E8');
        $this->addSql('CREATE TABLE color (id INT AUTO_INCREMENT NOT NULL, color VARCHAR(255) NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ENGINE = InnoDB');
        $this->addSql('CREATE TABLE designation (id INT AUTO_INCREMENT NOT NULL, name VARCHAR(255) NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ENGINE = InnoDB');
        $this->addSql('CREATE TABLE producer (id INT AUTO_INCREMENT NOT NULL, address_id INT NOT NULL, name VARCHAR(255) NOT NULL, phone VARCHAR(255) DEFAULT NULL, latitude VARCHAR(255) NOT NULL, longitude VARCHAR(255) NOT NULL, UNIQUE INDEX UNIQ_976449DCF5B7AF75 (address_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ENGINE = InnoDB');
        $this->addSql('CREATE TABLE variety (id INT AUTO_INCREMENT NOT NULL, name VARCHAR(255) NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ENGINE = InnoDB');
        $this->addSql('DROP TABLE wine');
        $this->addSql('CREATE TABLE wine (id INT AUTO_INCREMENT NOT NULL, color_id INT NOT NULL, variety_id INT NOT NULL, producer_id INT NOT NULL, INDEX IDX_560C64687ADA1FB5 (color_id), INDEX IDX_560C646878C2BC47 (variety_id), INDEX IDX_560C646889B658FE (producer_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ENGINE = InnoDB');
        $this->addSql('CREATE TABLE wine_designation (wine_id INT NOT NULL, designation_id INT NOT NULL, INDEX IDX_2DDF4CD28A2BD76 (wine_id), INDEX IDX_2DDF4CDFAC7D83F (designation_id), PRIMARY KEY(wine_id, designation_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ENGINE = InnoDB');
        $this->addSql('ALTER TABLE producer ADD CONSTRAINT FK_976449DCF5B7AF75 FOREIGN KEY (address_id) REFERENCES address (id)');
        $this->addSql('ALTER TABLE wine ADD CONSTRAINT FK_560C64687ADA1FB5 FOREIGN KEY (color_id) REFERENCES color (id)');
        $this->addSql('ALTER TABLE wine ADD CONSTRAINT FK_560C646878C2BC47 FOREIGN KEY (variety_id) REFERENCES variety (id)');
        $this->addSql('ALTER TABLE wine ADD CONSTRAINT FK_560C646889B658FE FOREIGN KEY (producer_id) REFERENCES producer (id)');
        $this->addSql('ALTER TABLE wine_designation ADD CONSTRAINT FK_2DDF4CD28A2BD76 FOREIGN KEY (wine_id) REFERENCES wine (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE wine_designation ADD CONSTRAINT FK_2DDF4CDFAC7D83F FOREIGN KEY (designation_id) REFERENCES designation (id) ON DELETE CASCADE');
        $this->addSql('DROP TABLE wine_category');
        $this->addSql('DROP TABLE wine_wine_category');
        $this->addSql('DROP TABLE winery');
        $this->addSql('DROP INDEX IDX_3D8CACBB32FAE8E8 ON beverage');
        $this->addSql('ALTER TABLE beverage DROP dtype, CHANGE winery_id producer_id INT NOT NULL');
        $this->addSql('ALTER TABLE beverage ADD CONSTRAINT FK_3D8CACBB89B658FE FOREIGN KEY (producer_id) REFERENCES producer (id)');
        $this->addSql('CREATE INDEX IDX_3D8CACBB89B658FE ON beverage (producer_id)');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE wine DROP FOREIGN KEY FK_560C64687ADA1FB5');
        $this->addSql('ALTER TABLE wine_designation DROP FOREIGN KEY FK_2DDF4CDFAC7D83F');
        $this->addSql('ALTER TABLE beverage DROP FOREIGN KEY FK_3D8CACBB89B658FE');
        $this->addSql('ALTER TABLE wine DROP FOREIGN KEY FK_560C646889B658FE');
        $this->addSql('ALTER TABLE wine DROP FOREIGN KEY FK_560C646878C2BC47');
        $this->addSql('ALTER TABLE wine_designation DROP FOREIGN KEY FK_2DDF4CD28A2BD76');
        $this->addSql('CREATE TABLE wine_category (id INT AUTO_INCREMENT NOT NULL, color VARCHAR(255) NOT NULL COLLATE utf8mb4_unicode_ci, variety VARCHAR(255) DEFAULT NULL COLLATE utf8mb4_unicode_ci, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB COMMENT = \'\' ');
        $this->addSql('CREATE TABLE wine_wine_category (wine_id INT NOT NULL, wine_category_id INT NOT NULL, INDEX IDX_CD7E6BDD99DC0822 (wine_category_id), INDEX IDX_CD7E6BDD28A2BD76 (wine_id), PRIMARY KEY(wine_id, wine_category_id)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB COMMENT = \'\' ');
        $this->addSql('CREATE TABLE winery (id INT AUTO_INCREMENT NOT NULL, address_id INT NOT NULL, name VARCHAR(255) NOT NULL COLLATE utf8mb4_unicode_ci, phone VARCHAR(255) NOT NULL COLLATE utf8mb4_unicode_ci, latitude VARCHAR(255) NOT NULL COLLATE utf8mb4_unicode_ci, longitude VARCHAR(255) NOT NULL COLLATE utf8mb4_unicode_ci, UNIQUE INDEX UNIQ_92F2D2F1F5B7AF75 (address_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB COMMENT = \'\' ');
        $this->addSql('ALTER TABLE wine_wine_category ADD CONSTRAINT FK_CD7E6BDD28A2BD76 FOREIGN KEY (wine_id) REFERENCES beverage (id) ON UPDATE NO ACTION ON DELETE CASCADE');
        $this->addSql('ALTER TABLE wine_wine_category ADD CONSTRAINT FK_CD7E6BDD99DC0822 FOREIGN KEY (wine_category_id) REFERENCES wine_category (id) ON UPDATE NO ACTION ON DELETE CASCADE');
        $this->addSql('ALTER TABLE winery ADD CONSTRAINT FK_92F2D2F1F5B7AF75 FOREIGN KEY (address_id) REFERENCES address (id) ON UPDATE NO ACTION ON DELETE NO ACTION');
        $this->addSql('DROP TABLE color');
        $this->addSql('DROP TABLE designation');
        $this->addSql('DROP TABLE producer');
        $this->addSql('DROP TABLE variety');
        $this->addSql('DROP TABLE wine');
        $this->addSql('DROP TABLE wine_designation');
        $this->addSql('DROP INDEX IDX_3D8CACBB89B658FE ON beverage');
        $this->addSql('ALTER TABLE beverage ADD dtype VARCHAR(255) NOT NULL COLLATE utf8mb4_unicode_ci, CHANGE producer_id winery_id INT NOT NULL');
        $this->addSql('ALTER TABLE beverage ADD CONSTRAINT FK_3D8CACBB32FAE8E8 FOREIGN KEY (winery_id) REFERENCES winery (id) ON UPDATE NO ACTION ON DELETE NO ACTION');
        $this->addSql('CREATE INDEX IDX_3D8CACBB32FAE8E8 ON beverage (winery_id)');
    }
}

<?php


namespace App\Controller;


use App\Entity\Producer;
use EasyCorp\Bundle\EasyAdminBundle\Controller\EasyAdminController;
use Symfony\Component\HttpClient\HttpClient;

class ProducerController extends EasyAdminController
{
        protected function updateEntity($entity)
        {
            if($entity instanceof Producer){
                $entity = $this->setLatitudeAndLongitude($entity);
            }
            parent::updateEntity($entity);
        }

        protected function persistEntity($entity)
        {
            if($entity instanceof Producer){
                $entity = $this->setLatitudeAndLongitude($entity);
            }
            parent::persistEntity($entity);
        }

        private function setLatitudeAndLongitude(Producer $entity){
            if(($entity->getLatitude() == null || $entity->getLongitude() == null) ){
                $address = $entity->getAddress();
                $parsedAddressLines = str_replace(' ','-',$address->getAddressLines());
                $parsedCity = str_replace(' ','-',$address->getCity());
                $client = HttpClient::create();
                $response = $client->request('GET', 'http://www.mapquestapi.com/geocoding/v1/address?key=y0TITKwvxumckEPFoEJrVoPCccjlBwyl&location='
                    .$address->getCountry()
                    .$address->getZipCode()
                    .$parsedCity
                    .$parsedAddressLines);
                $array = json_decode($response->getContent(),true);
                if(isset($array['results'][0]['locations'][0]['latLng']['lat'])){
                    $entity->setLatitude($array['results'][0]['locations'][0]['latLng']['lat']);
                }
                if(isset($array['results'][0]['locations'][0]['latLng']['lng'])){
                    $entity->setLongitude($array['results'][0]['locations'][0]['latLng']['lng']);
                }
            }

            return $entity;
        }

}
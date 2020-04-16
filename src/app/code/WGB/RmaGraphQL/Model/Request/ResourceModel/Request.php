<?php

namespace WGB\RmaGraphQL\Model\Request\ResourceModel;

use Amasty\Rma\Api\Data\RequestInterface;
use Magento\Framework\DB\Select;

class Request extends \Amasty\Rma\Model\Request\ResourceModel\Request {
    /**
     * @param $userId
     * @return array
     * @throws \Magento\Framework\Exception\LocalizedException
     */
    public function getRequestsForUser($userId) {
        // TODO columns
        $select = $this->getConnection()->select()->from(['request' => $this->getMainTable()])
            ->where('request.'.RequestInterface::CUSTOMER_ID.' = '.$userId);

        $result = [];
        if ($rows = $this->getConnection()->fetchAll($select)) {
            foreach ($rows as $row) {
                $result[] = $row;
            }
        }

        return $result;
    }
}
cp ./../eer-network/organizations/peerOrganizations/org1.example.com/connection-org1.yaml ./gateway/
cp ./../eer-network/organizations/peerOrganizations/org2.example.com/connection-org2.yaml ./gateway/

cp ./../eer-network/organizations/peerOrganizations/org1.example.com/users/User1@org1.example.com/msp/signcerts/* ./../eer-network/organizations/peerOrganizations/org1.example.com/users/User1@org1.example.com/msp/signcerts/User1@org1.example.com-cert.pem
cp ./../eer-network/organizations/peerOrganizations/org1.example.com/users/User1@org1.example.com/msp/keystore/* ./../eer-network/organizations/peerOrganizations/org1.example.com/users/User1@org1.example.com/msp/keystore/priv_sk

cp ./../eer-network/organizations/peerOrganizations/org2.example.com/users/User1@org2.example.com/msp/signcerts/* ./../eer-network/organizations/peerOrganizations/org2.example.com/users/User1@org2.example.com/msp/signcerts/User1@org2.example.com-cert.pem
cp ./../eer-network/organizations/peerOrganizations/org2.example.com/users/User1@org2.example.com/msp/keystore/* ./../eer-network/organizations/peerOrganizations/org2.example.com/users/User1@org2.example.com/msp/keystore/priv_sk
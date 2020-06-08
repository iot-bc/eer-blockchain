cp ./organizations/peerOrganizations/org1.example.com/connection-org1.yaml ./../config/gateway/
cp ./organizations/peerOrganizations/org2.example.com/connection-org2.yaml ./../config/gateway/

cp ./organizations/peerOrganizations/org1.example.com/users/User1@org1.example.com/msp/signcerts/* ./organizations/peerOrganizations/org1.example.com/users/User1@org1.example.com/msp/signcerts/User1@org1.example.com-cert.pem
cp ./organizations/peerOrganizations/org1.example.com/users/User1@org1.example.com/msp/keystore/* ./organizations/peerOrganizations/org1.example.com/users/User1@org1.example.com/msp/keystore/priv_sk

cp ./organizations/peerOrganizations/org2.example.com/users/User1@org2.example.com/msp/signcerts/* ./organizations/peerOrganizations/org2.example.com/users/User1@org2.example.com/msp/signcerts/User1@org2.example.com-cert.pem
cp ./organizations/peerOrganizations/org2.example.com/users/User1@org2.example.com/msp/keystore/* ./organizations/peerOrganizations/org2.example.com/users/User1@org2.example.com/msp/keystore/priv_sk

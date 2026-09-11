-- Query 00: Find the exact Twin Disc manufacturer record in SAP B1.
SELECT
    T0.FirmCode,
    T0.FirmName
FROM OMRC T0
WHERE T0.FirmName LIKE '%Twin%'
ORDER BY T0.FirmName;

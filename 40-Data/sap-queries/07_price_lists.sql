-- Query 07: List all SAP price lists so the correct retail/list price source can be identified.
SELECT
    T0.ListNum,
    T0.ListName
FROM OPLN T0
ORDER BY T0.ListNum;

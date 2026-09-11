-- Query 05: Complete Twin Disc sales ledger, one invoice line per record, last 10 years.
SELECT
    T0.DocDate,
    T0.DocNum,
    T0.CardCode,
    T0.CardName,
    T1.ItemCode,
    T1.Dscription,
    T1.Quantity,
    T1.Price,
    T1.LineTotal,
    T3.FirmName
FROM OINV T0
INNER JOIN INV1 T1 ON T0.DocEntry = T1.DocEntry
INNER JOIN OITM T2 ON T1.ItemCode = T2.ItemCode
INNER JOIN OMRC T3 ON T2.FirmCode = T3.FirmCode
WHERE
    T0.CANCELED = 'N'
    AND T0.DocDate >= DATEADD(YEAR, -10, GETDATE())
    AND T3.FirmName LIKE '%Twin Disc%'
ORDER BY
    T0.DocDate DESC,
    T0.DocNum DESC;

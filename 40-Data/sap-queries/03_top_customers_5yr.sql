-- Query 03: Top Twin Disc customers over the last 5 years.
SELECT
    T0.CardCode,
    T0.CardName,
    SUM(T1.LineTotal) AS TwinDiscRevenue,
    SUM(T1.Quantity) AS QtyPurchased,
    COUNT(DISTINCT T0.DocNum) AS InvoiceCount,
    COUNT(DISTINCT T1.ItemCode) AS UniqueTwinDiscItems,
    MIN(T0.DocDate) AS FirstPurchase,
    MAX(T0.DocDate) AS LastPurchase
FROM OINV T0
INNER JOIN INV1 T1 ON T0.DocEntry = T1.DocEntry
INNER JOIN OITM T2 ON T1.ItemCode = T2.ItemCode
INNER JOIN OMRC T3 ON T2.FirmCode = T3.FirmCode
WHERE
    T0.CANCELED = 'N'
    AND T0.DocDate >= DATEADD(YEAR, -5, GETDATE())
    AND T3.FirmName LIKE '%Twin Disc%'
GROUP BY
    T0.CardCode,
    T0.CardName
ORDER BY
    SUM(T1.LineTotal) DESC;

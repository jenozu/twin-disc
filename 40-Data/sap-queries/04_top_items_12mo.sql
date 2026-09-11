-- Query 04: Top-selling Twin Disc items over the last 12 months.
SELECT
    T1.ItemCode,
    T1.Dscription,
    SUM(T1.Quantity) AS QtySold,
    SUM(T1.LineTotal) AS SalesRevenue,
    COUNT(DISTINCT T0.CardCode) AS UniqueCustomers,
    COUNT(DISTINCT T0.DocNum) AS InvoiceCount,
    MAX(T0.DocDate) AS LastSaleDate
FROM OINV T0
INNER JOIN INV1 T1 ON T0.DocEntry = T1.DocEntry
INNER JOIN OITM T2 ON T1.ItemCode = T2.ItemCode
INNER JOIN OMRC T3 ON T2.FirmCode = T3.FirmCode
WHERE
    T0.CANCELED = 'N'
    AND T0.DocDate >= DATEADD(YEAR, -1, GETDATE())
    AND T3.FirmName LIKE '%Twin Disc%'
GROUP BY
    T1.ItemCode,
    T1.Dscription
ORDER BY
    SUM(T1.LineTotal) DESC;

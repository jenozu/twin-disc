-- Query 08: Twin Disc prices from the selected SAP price list.
-- Replace [PRICE_LIST_NUMBER] after running Query 07.
SELECT
    T0.ItemCode,
    T0.ItemName,
    T2.FirmName,
    T1.PriceList,
    T3.ListName,
    T1.Price,
    T1.Currency
FROM OITM T0
INNER JOIN ITM1 T1 ON T0.ItemCode = T1.ItemCode
INNER JOIN OMRC T2 ON T0.FirmCode = T2.FirmCode
INNER JOIN OPLN T3 ON T1.PriceList = T3.ListNum
WHERE
    T2.FirmName LIKE '%Twin Disc%'
    AND T1.PriceList = [PRICE_LIST_NUMBER]
ORDER BY T0.ItemCode;

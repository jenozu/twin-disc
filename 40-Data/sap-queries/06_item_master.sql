-- Query 06: Twin Disc item master and inventory snapshot.
SELECT
    T0.ItemCode,
    T0.ItemName,
    T1.FirmName,
    T0.OnHand,
    T0.IsCommited,
    T0.OnOrder,
    T0.LastPurPrc,
    T0.validFor,
    T0.frozenFor
FROM OITM T0
INNER JOIN OMRC T1 ON T0.FirmCode = T1.FirmCode
WHERE T1.FirmName LIKE '%Twin Disc%'
ORDER BY T0.ItemCode;

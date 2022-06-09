
# BUDO Bilet Takip Aracı

Budo biletlerini almayı hep son dakikaya bırakan birisi olarak sabah 08:00 seferine hiçbir zaman boş bilet bulamadım. Bu yüzden budo bilet sayfasını 3 saniyede bir kontrol eden ve herhangi bir bilet iptal edildiğinde anında haber veren bu uygulamayı geliştirdim.

Ben bildiri yöntemi olarak sms servisi kullandım, siz methodu istediğiniz gibi özelleştirerek farklı yöntemler kullanabilirsiniz.




## Örnek Kullanım

```javascript
// Sınıfı sayfaya dahil edin
import BudoTicketTracker from "./budoTicketTracker";

// Budo sayfasından alacağınız hedef kodlarıyla sınıfı başlatın
const ticketTracker = new BudoTicketTracker(
  "77c36df0-b308-e211-9b8d-a526e1ea2306", // Mudanya-Bursa
  "eb9a2e6c-dda7-e611-8a56-000c29f304a8", // Eminönü-İstanbul
  new Date("2022-06-11 08:00:00") // Bilet tarihi
);

// İstediğiniz zaman sıklığında boş koltukları kontrol edin
const checkInterval = async () => {
  const emptySeat = await ticketTracker.checkEmptySeat();
  emptySeat
    ? ticketTracker.emptySeatNotification()
    : setTimeout(() => checkInterval(), config.timeInterval);
};

checkInterval();
```

  
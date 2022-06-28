import React, { useState } from 'react';
import { HiOutlineChevronDown } from "react-icons/hi";

export default function Description() {
  const [showFully, setShowFully] = useState(false);

  return (
    <div className='mb-8 pb-12 relative'>
      <div className={`descr font-raleway overflow-hidden ${!showFully && "h-80"}`}>
        <h1>Handalak onlayn do&#39;koni -&nbsp;&nbsp;xarid qilish uchun&nbsp;qulay&nbsp;gipermarket</h1>
        <p>Har qanday insoning hayoti va qulay sharoitlarini zamonaviy texnologiyalarsiz tasavvur qilib bo&#39;lmaydi. Ish va shaxsiy savollar - smartfonda, sevimli filmlar, seriallar va teleko&#39;rsatuvlar - televizor, tozalash, yig&rsquo;ishtirish &ndash; changyutgich, pishirish, tayyorlash - pechka, pech va ko&#39;plab kichikroq, ammo undan kam bo&#39;lmagan foydali qurilmalar va mahsulotlar. Bundan tashqari, texnologiyalar rivojlanmoqda va shuning uchun jihozlar muntazam yangilanishlarni talab qiladi, men yangi modellarni sinab, tekshirib ko&#39;rishni xohlayman lekin mavjud qurilmalar va texnikalarning kuchi yetarli emas. Shu nuqtai nazardan, maishiy texnika sotib olish uchun xavfsiz va qulay joy, online-do&rsquo;kon bo&#39;lishi foydalidir. Agar siz hali o&#39;zingiz uchun mahsulot - tovar topa olmagan bo&#39;lsangiz, biz sizni web-saytimizda bir necha daqiqa qolishga taklif qilamiz. Sizni ishontirib aytamizki, vaqtingizni behuda sarf qilmaganligingizga ishonch hosil qilasiz.</p>
        <h2>O&#39;zbekistonda texnikalarni qayerdan sotib olish mumkin?</h2>
        <p>&nbsp;</p>
        <p>Mamlakatda elektronika - texnikalarni sotib olish uchun juda ko&#39;p do&#39;kon va imkoniyatlar mavjud, ammo assortiment, tanlov, narx, buyurtma berishning shartlari mijozga mos kelishi muhimdir. Biz nima taklif qilamiz:</p>
        <ul>
          <li>
            <p>Barcha toifadagi tovar, texnikalarning ajoyib tanlovi - televizorlar, smartfonlar, oshxona anjomlaridan tortib avtomobil va o&#39;yin, gamerlar uchun devays va jihozlarigacha. Bundan tashqari, biz faqat original brendli mahsulotlarni sotamiz va siz kafolat va servis xizmatlarini qo&rsquo;lga kiritasiz;</p>
          </li>
          <li>
            <p>Internet-do&lsquo;kon formatida ishlagan holda, biz operatsion xarajatlarni sezilarli darajada kamaytiramiz va bir xil mahsulot uchun, bozor narxlaridan past narxlarni taklif qilib kafolat beramiz;</p>
          </li>
          <li>
            <p>Qulay muddatli bo&rsquo;lib to&rsquo;lashga xarid qilish &ndash; ortiqcha hujjatlarsiz, banklar aralashmagan holda. To&#39;lovni kechiktirganlik uchun jarimasiz, muddatli bo&#39;lib to&#39;lashni tezda tashkil qilish uchun sizda faqat passport va bank kartasi bo&#39;lishi kifoya;</p>
          </li>
          <li>
            <p>Tez yetkazib berish (Toshkentda 4 dan 12 ish soatigacha, viloyatlarda 1-3 ish kunigacha). Xarid qilish hech qachon bunchalik oson bo&#39;lmagan &ndash; buyurtma xaridingizni onlayn joylashtiring va uni tez yetkazib berish xizmatimiz orqali qabul qiling;</p>
          </li>
          <li>
            <p>Bizda tez-tez chegirmalar bo&rsquo;lib turadi, mega-aksiya kunlari tashkil etiladi va istalgan hajmdagi buyurtmalar uchun shaxsiy sovg&#39;alar taqdim etiladi.</p>
          </li>
        </ul>
        <h2>Onlayn xarid - tez, qulay va xavfsiz</h2>
        <p>&nbsp;</p>
        <p>Handalak 2022-yildan beri bozorda faoliyat yuritayotgan kompaniya bo&lsquo;lsa-da, bu boradagi xodimlarning tajribasi 16 yilga yetadi. Biz har xil brendlar va yaxshi narx segmentlari bilan ishlaymiz va har bir mijozga o&#39;z byudjetiga, hisobiga mos variantni taklif qilishimiz mumkin. Onlayn xarid qilish qulayligi xaridning moliyaviy foydasi bilan birga keladi. Bir necha marta bosish orqali pulni tejang va ishonchli mahsulotlarni sotib oling. Biz maslahat berishdan xursand bo&#39;lamiz.</p>
      </div>
      <button
        onClick={() => setShowFully(prev => !prev)}
        className='flex items-center justify-between cursor-pointer space-x-2 text-red text-base font-semibold p-2'
      >
        <HiOutlineChevronDown className={`text-red text-[24px] stroke-red ${showFully && "rotate-180"}`} />
        <span>{showFully ? "Yashirish" : "To'liq ko'rsatish"}</span>
      </button>
    </div>
  )
}

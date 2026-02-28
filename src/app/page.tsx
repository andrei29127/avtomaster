'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { 
  Wrench, 
  Car, 
  Shield, 
  CheckCircle2, 
  Phone, 
  Mail, 
  MapPin, 
  Clock,
  Search,
  Package,
  MessageCircle,
  ArrowRight,
  Menu,
  X,
  Sparkles,
  ThumbsUp,
  AlertTriangle,
  HandshakeIcon,
  FileCheck,
  Settings,
  ShieldCheck,
  MessageSquare,
  Send
} from 'lucide-react'

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    vin: '',
    service: '',
    message: ''
  })
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')
  const [vinError, setVinError] = useState('')
  const [modalOpen, setModalOpen] = useState(false)
  const [complaintData, setComplaintData] = useState({
    name: '',
    phone: '',
    type: 'complaint',
    orderNumber: '',
    message: ''
  })
  const [complaintSubmitted, setComplaintSubmitted] = useState(false)
  const [complaintSubmitting, setComplaintSubmitting] = useState(false)

  const validateVin = (vin: string) => {
    if (!vin) return 'VIN обязателен для заполнения'
    if (vin.length !== 17) return 'VIN должен содержать ровно 17 символов'
    if (!/^[A-HJ-NPR-Z0-9]+$/i.test(vin)) return 'VIN может содержать только латинские буквы (кроме I, O, Q) и цифры'
    return ''
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    const vinErr = validateVin(formData.vin)
    if (vinErr) {
      setVinError(vinErr)
      return
    }
    
    setIsSubmitting(true)
    setSubmitError('')
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })
      
      const result = await response.json()
      
      if (response.ok && result.success) {
        setFormSubmitted(true)
        setTimeout(() => {
          setFormSubmitted(false)
          setFormData({ name: '', phone: '', vin: '', service: '', message: '' })
        }, 3000)
      } else {
        setSubmitError(result.error || 'Ошибка при отправке заявки')
      }
    } catch (error) {
      console.error('Submit error:', error)
      setSubmitError('Ошибка соединения. Попробуйте позвонить нам.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleComplaintSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setComplaintSubmitting(true)
    
    try {
      const response = await fetch('/api/feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(complaintData),
      })
      
      const result = await response.json()
      
      if (response.ok && result.success) {
        setComplaintSubmitted(true)
        setTimeout(() => {
          setComplaintSubmitted(false)
          setComplaintData({ name: '', phone: '', type: 'complaint', orderNumber: '', message: '' })
        }, 3000)
      }
    } catch (error) {
      console.error('Complaint submit error:', error)
    } finally {
      setComplaintSubmitting(false)
    }
  }

  const services = [
    {
      icon: <Wrench className="w-8 h-8" />,
      title: 'Ремонт автомобилей',
      description: 'Качественный ремонт любой сложности. Диагностика, ремонт двигателя, ходовой части, электрики и кузова. Опытные мастера и современное оборудование.',
      features: ['Диагностика', 'Двигатель', 'Ходовая', 'Электрика']
    },
    {
      icon: <Package className="w-8 h-8" />,
      title: 'Запчасти новые и б/у',
      description: 'Широкий ассортимент оригинальных и аналоговых запчастей. Б/у запчасти в отличном состоянии с гарантией. Доставка по всей России.',
      features: ['Оригиналы', 'Аналоги', 'Б/у в отличном состоянии', 'Доставка']
    },
    {
      icon: <Search className="w-8 h-8" />,
      title: 'Подбор б/у запчастей',
      description: 'Поможем найти редкие и недорогие б/у запчасти. Проверенные поставщики, контроль качества, гарантия соответствия.',
      features: ['Поиск редких запчастей', 'Проверенные продавцы', 'Контроль качества', 'Гарантия']
    }
  ]

  const advantages = [
    {
      icon: <Shield className="w-10 h-10" />,
      title: 'Защита от мошенников',
      description: 'Личная проверка каждого продавца и запчасти. Безопасные сделки через наш сервис. Полная защита ваших денег.'
    },
    {
      icon: <CheckCircle2 className="w-10 h-10" />,
      title: 'Гарантия качества',
      description: 'Гарантия на все запчасти и работы. Возврат денег при несоответствии. Честные условия без скрытых платежей.'
    },
    {
      icon: <Clock className="w-10 h-10" />,
      title: 'Быстрое обслуживание',
      description: 'Срочный ремонт в день обращения. Подбор запчастей за 1-3 дня. Оперативная связь с менеджером.'
    },
    {
      icon: <ThumbsUp className="w-10 h-10" />,
      title: 'Опыт и репутация',
      description: 'Более 10 лет на рынке. Тысячи довольных клиентов. Прозрачные цены и честный подход к каждому заказчику.'
    }
  ]

  const steps = [
    {
      step: '01',
      title: 'Оставьте заявку',
      description: 'Позвоните или заполните форму на сайте. Расскажите, какая запчасть или услуга вам нужна.'
    },
    {
      step: '02',
      title: 'Мы находим варианты',
      description: 'Проверяем наличие у партнёров, сравниваем цены и качество. Предлагаем лучшие варианты.'
    },
    {
      step: '03',
      title: 'Безопасная сделка',
      description: 'Вы оплачиваете запчасть через нас. Мы проверяем товар и только потом переводим деньги продавцу.'
    },
    {
      step: '04',
      title: 'Доставка или установка',
      description: 'Доставляем запчасть вам или сразу устанавливаем в нашем сервисе. Вы получаете гарантию.'
    }
  ]

  const faq = [
    {
      question: 'Как вы защищаете от мошенников?',
      answer: 'Мы работаем по системе безопасной сделки: вы оплачиваете запчасть нам, мы проверяем товар у продавца, и только после проверки переводим деньги. Если запчасть не соответствует описанию — возвращаем деньги. Все продавцы проходят нашу верификацию.'
    },
    {
      question: 'Какая гарантия на б/у запчасти?',
      answer: 'На все б/у запчасти даём гарантию от 14 дней до 6 месяцев в зависимости от типа детали. Если запчасть вышла из строя в гарантийный период — меняем или возвращаем деньги.'
    },
    {
      question: 'Сколько стоит подбор запчастей?',
      answer: 'Услуга подбора бесплатна. Вы платите только за саму запчасть и доставку. Наша комиссия уже включена в итоговую цену, никаких скрытых платежей.'
    },
    {
      question: 'Как быстро можно получить запчасть?',
      answer: 'Стандартный срок подбора — 1-3 дня. Срочный поиск — в день обращения. Доставка по городу 1-2 дня, по России 3-7 дней в зависимости от региона.'
    },
    {
      question: 'Работаете ли вы с юридическими лицами?',
      answer: 'Да, работаем с автосервисами, таксопарками и компаниями. Предоставляем полный пакет документов, работаем по безналичному расчёту, предлагаем специальные условия для постоянных клиентов.'
    }
  ]

  return (
    <div className="min-h-screen bg-transparent text-foreground">
      
      {/* Brand / Tech Center Title */}
      <div className="w-full flex justify-center pt-8">
        <div className="flex flex-col items-center text-center">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl gradient-bg flex items-center justify-center shadow-lg">
              <Car className="w-7 h-7 text-white" />
            </div>
            <div className="text-left">
              <div className="text-3xl font-extrabold tracking-tight">AutoMaster</div>
              <div className="text-sm text-muted-foreground font-medium">Техцентр • Запчасти • Ремонт</div>
            </div>
          </div>
          <div className="mt-3 flex flex-wrap justify-center gap-2">
            <Badge variant="secondary" className="text-sm">Подбор по VIN</Badge>
            <Badge variant="secondary" className="text-sm">Новые и Б/У запчасти</Badge>
            <Badge variant="secondary" className="text-sm">Гарантия на работы</Badge>
          </div>
        </div>
      </div>

      {/* Top Center Action Buttons */}
      <div className="hidden sm:flex w-full justify-center pt-8 pb-4">
        <div className="flex flex-col sm:flex-row gap-4 items-center">
          <a href="#contact">
            <Button className="gradient-bg hover:scale-105 hover:shadow-xl transition-all duration-300 ease-out flex items-center gap-2 px-8 py-6 text-lg">
              <Send className="w-6 h-6 text-white" />
              Оставить заявку
            </Button>
          </a>
          <a href="#feedback">
            <Button className="bg-green-500 hover:bg-green-600 hover:scale-105 hover:shadow-lg transition-all duration-300 ease-out text-white flex items-center gap-2 px-8 py-6 text-lg">
              <MessageSquare className="w-6 h-6 text-white" />
              Обратная связь
            </Button>
          </a>
        </div>
      </div>

      {/* Header */}
      

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center hero-gradient pt-20">
        <div className="absolute inset-0 bg-[url('/hero-bg.jpg')] bg-cover bg-center opacity-10"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 py-20 md:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 hero-with-car">
              <div className="car-overlay" aria-hidden="true"></div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary border border-border">
                <Sparkles className="w-4 h-4 text-primary" />
                <span className="text-sm">Более 10 лет на рынке</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                Ремонт авто и <span className="gradient-text">безопасный подбор</span> запчастей
              </h1>
              
              <p className="text-lg md:text-xl text-muted-foreground max-w-xl">
                Качественный ремонт, новые и б/у запчасти с гарантией. 
                Защита от мошенников при покупке б/у деталей. Экономия до 70% без риска!
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <a href="#" onClick={(e)=>{e.preventDefault();}} target="_blank" rel="noopener noreferrer">
                  <Button size="lg" className="gradient-bg hover:scale-105 hover:shadow-xl transition-all duration-300 ease-out text-lg px-8 py-6">
                    <MessageCircle className="mr-2 w-5 h-5" />
                    Получить консультацию
                  </Button>
                </a>
              </div>
              
              <div className="flex items-center gap-8 pt-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">5000+</div>
                  <div className="text-sm text-muted-foreground">Довольных клиентов</div>
                </div>
                <div className="w-px h-12 bg-border"></div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">10+</div>
                  <div className="text-sm text-muted-foreground">Лет опыта</div>
                </div>
                <div className="w-px h-12 bg-border"></div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">98%</div>
                  <div className="text-sm text-muted-foreground">Успешных сделок</div>
                </div>
              </div>
            </div>
            
            <div className="relative hidden lg:block">
              <div className="absolute inset-0 gradient-bg opacity-20 blur-3xl rounded-full"></div>
              <div className="relative bg-card border border-border rounded-2xl p-8 space-y-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full gradient-bg flex items-center justify-center">
                    <Shield className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="font-semibold">Защита от мошенников</div>
                    <div className="text-sm text-muted-foreground">100% безопасные сделки</div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary mt-0.5" />
                    <div>
                      <div className="font-medium">Проверка продавцов</div>
                      <div className="text-sm text-muted-foreground">Только проверенные поставщики</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary mt-0.5" />
                    <div>
                      <div className="font-medium">Контроль качества</div>
                      <div className="text-sm text-muted-foreground">Осмотр перед отправкой</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary mt-0.5" />
                    <div>
                      <div className="font-medium">Гарантия возврата</div>
                      <div className="text-sm text-muted-foreground">Деньги под защитой</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary mt-0.5" />
                    <div>
                      <div className="font-medium">Юридическая поддержка</div>
                      <div className="text-sm text-muted-foreground">Помощь в спорных ситуациях</div>
                    </div>
                  </div>
                </div>
                
                <div className="pt-4 border-t border-border">
                  <div className="flex items-center gap-2 text-primary">
                    <AlertTriangle className="w-5 h-5" />
                    <span className="font-medium">Не рискуйте деньгами!</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">
                    Покупка б/у запчастей у частников — риск потери денег. Мы берём риски на себя.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 md:py-32 bg-card/50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4 gradient-bg">Наши услуги</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Полный комплекс услуг для вашего авто
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              От ремонта до подбора запчастей — всё в одном месте с гарантией качества
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="bg-card border-border card-hover gradient-border">
                <CardHeader>
                  <div className="w-16 h-16 rounded-xl gradient-bg flex items-center justify-center mb-4">
                    {service.icon}
                  </div>
                  <CardTitle className="text-xl">{service.title}</CardTitle>
                  <CardDescription className="text-muted-foreground">
                    {service.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {service.features.map((feature, i) => (
                      <Badge key={i} variant="secondary" className="bg-secondary/50">
                        {feature}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4 gradient-bg">Как это работает</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Безопасный подбор запчастей за 4 шага
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Простой и прозрачный процесс, который защищает ваши деньги и время
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((item, index) => (
              <div key={index} className="relative">
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-12 left-full w-full h-0.5 bg-gradient-to-r from-primary to-transparent -translate-y-1/2"></div>
                )}
                <div className="text-center">
                  <div className="w-24 h-24 mx-auto rounded-full gradient-bg flex items-center justify-center mb-6 glow-orange">
                    <span className="text-3xl font-bold">{item.step}</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Advantages Section */}
      <section id="advantages" className="py-20 md:py-32 bg-card/50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4 gradient-bg">Преимущества</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Почему выбирают нас
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Мы не просто продаём запчасти — мы защищаем ваши интересы
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {advantages.map((item, index) => (
              <Card key={index} className="bg-card border-border card-hover text-center p-6">
                <CardContent className="pt-6">
                  <div className="w-20 h-20 mx-auto rounded-full bg-secondary flex items-center justify-center mb-6 text-primary">
                    {item.icon}
                  </div>
                  <h3 className="text-lg font-semibold mb-3">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Protection Banner */}
      <section className="py-16 gradient-bg">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex items-center gap-6">
              <div className="w-20 h-20 rounded-full bg-white/10 flex items-center justify-center">
                <HandshakeIcon className="w-10 h-10" />
              </div>
              <div>
                <h3 className="text-2xl md:text-3xl font-bold mb-2">
                  Безопасные сделки — наша ответственность
                </h3>
                <p className="text-white/80">
                  100% защита от мошенников. Если что-то пойдёт не так — вернём деньги.
                </p>
              </div>
            </div>
            <Button size="lg" variant="secondary" className="shrink-0" onClick={() => setModalOpen(true)}>
              Узнать подробнее
            </Button>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 md:py-32 bg-card/50">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4 gradient-bg">FAQ</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Часто задаваемые вопросы
            </h2>
            <p className="text-lg text-muted-foreground">
              Ответы на популярные вопросы
            </p>
          </div>
          
          <Accordion type="single" collapsible className="w-full space-y-4">
            {faq.map((item, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="bg-card border border-border rounded-lg px-6">
                <AccordionTrigger className="text-left font-medium hover:text-primary">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Complaints and Suggestions Section */}
      <section id="feedback" className="py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <Badge className="mb-4 bg-red-500/20 text-red-400 border-red-500/30">Обратная связь</Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Жалобы и предложения
              </h2>
              <p className="text-lg text-muted-foreground mb-6">
                Ваше мнение важно для нас. Если у вас возникла проблема или есть идея, как сделать наш сервис лучше — напишите нам. Мы внимательно рассмотрим каждое обращение.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-start gap-4 p-4 bg-secondary/50 rounded-xl border border-border">
                  <div className="w-10 h-10 rounded-lg bg-red-500/20 flex items-center justify-center text-red-400 shrink-0">
                    <AlertTriangle className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Жалоба</h4>
                    <p className="text-sm text-muted-foreground">
                      Сообщите о проблеме с заказом, доставкой или качеством услуги. Мы разберёмся и исправим ситуацию.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4 p-4 bg-secondary/50 rounded-xl border border-border">
                  <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center text-green-400 shrink-0">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Предложение</h4>
                    <p className="text-sm text-muted-foreground">
                      Есть идея, как улучшить наш сервис? Поделитесь с нами! Мы ценим конструктивные предложения.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4 p-4 bg-primary/10 rounded-xl border border-primary/30">
                  <div className="w-10 h-10 rounded-lg gradient-bg flex items-center justify-center text-white shrink-0">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Гарантия ответа</h4>
                    <p className="text-sm text-muted-foreground">
                      Мы отвечаем на все обращения в течение 24 часов в рабочие дни. Ваш голос будет услышан.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-blue-500/10 rounded-xl border border-blue-500/30">
                  <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center text-blue-400 shrink-0">
                    <Shield className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Полная анонимность</h4>
                    <p className="text-sm text-muted-foreground">
                      Все обращения строго анонимны. Ваша личная информация защищена и не передаётся третьим лицам.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <Card id="feedback-form" className="bg-card border-border p-6 md:p-8">
                <CardHeader className="p-0 mb-6">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-lg gradient-bg flex items-center justify-center">
                      <MessageSquare className="w-5 h-5 text-white" />
                    </div>
                    <CardTitle>Форма обратной связи</CardTitle>
                  </div>
                  <CardDescription>
                    Заполните форму и мы свяжемся с вами в ближайшее время
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                  {complaintSubmitted ? (
                    <div className="text-center py-8">
                      <div className="w-16 h-16 mx-auto rounded-full gradient-bg flex items-center justify-center mb-4">
                        <CheckCircle2 className="w-8 h-8" />
                      </div>
                      <h3 className="text-xl font-semibold mb-2">Обращение отправлено!</h3>
                      <p className="text-muted-foreground">Мы рассмотрим его в течение 24 часов</p>
                    </div>
                  ) : (
<form onSubmit={handleComplaintSubmit} className="space-y-4">
                      <div>
                        <label className="text-sm font-medium mb-2 block">Ваше имя</label>
                        <Input
                          placeholder="Иван Иванов"
                          value={complaintData.name}
                          onChange={(e) => setComplaintData({...complaintData, name: e.target.value})}
                          required
                          className="bg-secondary border-border"
                        />
                      </div>
                      
                      <div>
                        <label className="text-sm font-medium mb-2 block">Телефон для связи</label>
                        <Input
                          type="tel"
                          placeholder="+7 (999) 123-45-67"
                          value={complaintData.phone}
                          onChange={(e) => setComplaintData({...complaintData, phone: e.target.value})}
                          required
                          className="bg-secondary border-border"
                        />
                      </div>
                      
                      <div>
                        <label className="text-sm font-medium mb-2 block">Тип обращения</label>
                        <div className="flex gap-4">
                          <label className="flex items-center gap-2 cursor-pointer">
                            <input
                              type="radio"
                              name="type"
                              value="complaint"
                              checked={complaintData.type === 'complaint'}
                              onChange={(e) => setComplaintData({...complaintData, type: e.target.value})}
                              className="w-4 h-4 text-primary"
                            />
                            <span className="text-sm">Жалоба</span>
                          </label>
                          <label className="flex items-center gap-2 cursor-pointer">
                            <input
                              type="radio"
                              name="type"
                              value="suggestion"
                              checked={complaintData.type === 'suggestion'}
                              onChange={(e) => setComplaintData({...complaintData, type: e.target.value})}
                              className="w-4 h-4 text-primary"
                            />
                            <span className="text-sm">Предложение</span>
                          </label>
                        </div>
                      </div>
                      
                      <div>
                        <label className="text-sm font-medium mb-2 block">Номер заказа (если есть)</label>
                        <Input
                          placeholder="Например: AM-12345"
                          value={complaintData.orderNumber}
                          onChange={(e) => setComplaintData({...complaintData, orderNumber: e.target.value})}
                          className="bg-secondary border-border"
                        />
                      </div>
                      
                      <div>
                        <label className="text-sm font-medium mb-2 block">Сообщение</label>
                        <Textarea
                          placeholder={complaintData.type === 'complaint' 
                            ? 'Опишите возникшую проблему...' 
                            : 'Опишите ваше предложение...'
                          }
                          value={complaintData.message}
                          onChange={(e) => setComplaintData({...complaintData, message: e.target.value})}
                          required
                          rows={4}
                          className="bg-secondary border-border resize-none"
                        />
                      </div>
                      
                      <Button 
                        type="submit" 
                        size="lg" 
                        className={`w-full ${complaintData.type === 'complaint' 
                          ? 'bg-red-500 hover:bg-red-600' 
                          : 'bg-green-500 hover:bg-green-600 hover:scale-105 hover:shadow-lg transition-all duration-300 ease-out'
                        } text-white`}
                        disabled={complaintSubmitting}
                      >
                        {complaintSubmitting ? (
                          <>
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Отправка...
                          </>
                        ) : (
                          <>
                            <Send className="mr-2 w-5 h-5" />
                            {complaintData.type === 'complaint' ? 'Отправить жалобу' : 'Отправить предложение'}
                          </>
                        )}
                      </Button>
                      
                      <p className="text-xs text-muted-foreground text-center">
                        Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности
                      </p>
                    </form>
)}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section id="contact" className="py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16">
            <div>
              <Badge className="mb-4 gradient-bg">Контакты</Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Оставьте заявку
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Свяжитесь с нами для консультации или записи на ремонт. 
                Мы перезвоним в течение 15 минут в рабочее время.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-secondary flex items-center justify-center text-primary shrink-0">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Телефоны</div>
                    <a href="tel:+79780884106" className="block text-lg font-medium hover:text-primary transition-colors">
                      +7 (978) 088-41-06
                    </a>
                    <a href="tel:+79782978594" className="block text-lg font-medium hover:text-primary transition-colors">
                      +7 (978) 297-85-94
                    </a>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-secondary flex items-center justify-center text-primary">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Email</div>
                    <a href="mailto:stogeroev@yandex.ru" className="text-lg font-medium hover:text-primary transition-colors">
                      stogeroev@yandex.ru
                    </a>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-secondary flex items-center justify-center text-primary">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Адрес</div>
                    <div>
                    <div className="text-lg font-medium">Республика Крым, г. Керчь,</div>
                    <div className="text-lg font-medium">ул. Героев Сталинграда, 23</div>
                  </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-secondary flex items-center justify-center text-primary">
                    <Clock className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Режим работы</div>
                    <div>
                    <div className="text-lg font-medium">Пн-Пт: 9:00 - 18:00</div>
                    <div className="text-muted-foreground">Сб, Вс — выходные</div>
                  </div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-secondary flex items-center justify-center text-primary">
                    <MessageCircle className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Мессенджеры</div>
                    <div className="flex gap-4 mt-1">
                      <a href="https://wa.me/79780884106" target="_blank" rel="noopener noreferrer" className="text-lg font-medium hover:text-primary transition-colors">WhatsApp</a>
                      <a href="#" onClick={(e)=>{e.preventDefault();}} target="_blank" rel="noopener noreferrer" className="text-lg font-medium hover:text-primary transition-colors">Telegram</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <Card id="contact-form" className="bg-card border-border p-6 md:p-8">
                <CardHeader className="p-0 mb-6">
                  <CardTitle>Форма заявки</CardTitle>
                  <CardDescription>
                    Заполните форму и мы свяжемся с вами в ближайшее время
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                  {formSubmitted ? (
                    <div className="text-center py-8">
                      <div className="w-16 h-16 mx-auto rounded-full gradient-bg flex items-center justify-center mb-4">
                        <CheckCircle2 className="w-8 h-8" />
                      </div>
                      <h3 className="text-xl font-semibold mb-2">Заявка отправлена!</h3>
                      <p className="text-muted-foreground">Мы перезвоним вам в течение 15 минут</p>
                    </div>
                  ) : (
<form onSubmit={handleSubmit} className="space-y-4">
                      <div>
                        <label className="text-sm font-medium mb-2 block">Ваше имя</label>
                        <Input
                          placeholder="Иван Иванов"
                          value={formData.name}
                          onChange={(e) => setFormData({...formData, name: e.target.value})}
                          required
                          className="bg-secondary border-border"
                        />
                      </div>
                      
                      <div>
                        <label className="text-sm font-medium mb-2 block">Телефон</label>
                        <Input
                          type="tel"
                          placeholder="+7 (999) 123-45-67"
                          value={formData.phone}
                          onChange={(e) => setFormData({...formData, phone: e.target.value})}
                          required
                          className="bg-secondary border-border"
                        />
                      </div>
                      
                      <div>
                        <label className="text-sm font-medium mb-2 block">
                          VIN автомобиля <span className="text-primary">*</span>
                        </label>
                        <Input
                          type="text"
                          placeholder="Например: WVWZZZ1KZPW123456"
                          value={formData.vin}
                          onChange={(e) => {
                            const value = e.target.value.toUpperCase().replace(/[^A-HJ-NPR-Z0-9]/gi, '')
                            setFormData({...formData, vin: value})
                            if (vinError) setVinError('')
                          }}
                          maxLength={17}
                          required
                          className={`bg-secondary border-border ${vinError ? 'border-red-500 focus-visible:ring-red-500' : ''}`}
                        />
                        <div className="flex justify-between mt-1">
                          {vinError ? (
                            <span className="text-xs text-red-500">{vinError}</span>
                          ) : (
                            <span className="text-xs text-muted-foreground">17 символов (латинские буквы и цифры)</span>
                          )}
                          <span className={`text-xs ${formData.vin.length === 17 ? 'text-green-500' : 'text-muted-foreground'}`}>
                            {formData.vin.length}/17
                          </span>
                        </div>
                      </div>
                      
                      <div>
                        <label className="text-sm font-medium mb-2 block">Тип услуги</label>
                        <select
                          value={formData.service}
                          onChange={(e) => setFormData({...formData, service: e.target.value})}
                          required
                          className="w-full h-10 px-3 rounded-md bg-secondary border border-border text-foreground"
                        >
                          <option value="">Выберите услугу</option>
                          <option value="repair">Ремонт автомобиля</option>
                          <option value="parts-new">Новые запчасти</option>
                          <option value="parts-used">Б/у запчасти</option>
                          <option value="selection">Подбор запчастей</option>
                          <option value="defect-part">Брак детали</option>
                          <option value="poor-repair">Некачественный ремонт</option>
                          <option value="other">Другое</option>
                        </select>
                      </div>
                      
                      <div>
                        <label className="text-sm font-medium mb-2 block">Сообщение</label>
                        <Textarea
                          placeholder="Опишите вашу задачу или вопрос..."
                          value={formData.message}
                          onChange={(e) => setFormData({...formData, message: e.target.value})}
                          rows={4}
                          className="bg-secondary border-border resize-none"
                        />
                      </div>
                      
                      <Button type="submit" size="lg" className="w-full gradient-bg hover:scale-105 hover:shadow-xl transition-all duration-300 ease-out" disabled={isSubmitting}>
                        {isSubmitting ? (
                          <>
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Отправка...
                          </>
                        ) : (
                          <>
                            Отправить заявку
                            <ArrowRight className="ml-2 w-5 h-5" />
                          </>
                        )}
                      </Button>
                      
                      {submitError && (
                        <p className="text-sm text-red-500 text-center mt-2">
                          {submitError}
                        </p>
                      )}
                      
                      <p className="text-xs text-muted-foreground text-center">
                        Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности
                      </p>
                    </form>
)}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Guarantee Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={() => setModalOpen(false)}
          ></div>
          
          {/* Modal */}
          <div className="relative bg-card border border-border rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="sticky top-0 bg-card border-b border-border p-6 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full gradient-bg flex items-center justify-center">
                  <ShieldCheck className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">Гарантийные условия</h3>
                  <p className="text-sm text-muted-foreground">Полная защита ваших покупок</p>
                </div>
              </div>
              <button 
                onClick={() => setModalOpen(false)}
                className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center hover:bg-primary/20 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            {/* Modal Content */}
            <div className="p-6 space-y-6">
              {/* Гарантия при доставке */}
              <div className="bg-secondary/50 rounded-xl p-5 border border-border">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center shrink-0">
                    <Package className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg mb-2">Гарантия при доставке запчастей</h4>
                    <p className="text-muted-foreground mb-3">
                      При заказе запчастей с доставкой вы получаете гарантию <span className="text-primary font-bold">от 5 до 10 дней</span> с момента вручения товара.
                    </p>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                        <span>Проверка работоспособности в день получения</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                        <span>Возврат или замена при обнаружении дефектов</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                        <span>Техническая поддержка по установке</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Гарантия при установке */}
              <div className="bg-primary/10 rounded-xl p-5 border border-primary/30">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg gradient-bg flex items-center justify-center shrink-0">
                    <Settings className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 text-primary text-xs font-bold mb-2">
                      <Sparkles className="w-3 h-3" />
                      РЕКОМЕНДУЕМ
                    </div>
                    <h4 className="font-semibold text-lg mb-2">Удвоенная гарантия при установке в нашем сервисе</h4>
                    <p className="text-muted-foreground mb-3">
                      При установке запчастей в нашем автосервисе гарантия <span className="text-primary font-bold">увеличивается в 2 раза</span> — от 10 до 20 дней!
                    </p>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                        <span>Профессиональная установка опытными мастерами</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                        <span>Проверка работоспособности после установки</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                        <span>Бесплатная диагностика в случае проблем</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Условия гарантии */}
              <div className="bg-card rounded-xl p-5 border border-border">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-secondary flex items-center justify-center shrink-0">
                    <FileCheck className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-lg mb-3">Условия сохранения гарантии</h4>
                    
                    <div className="space-y-3">
                      <div className="flex items-start gap-3 p-3 bg-secondary/30 rounded-lg">
                        <Shield className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                        <div>
                          <span className="font-medium">Сохранение пломб и меток</span>
                          <p className="text-sm text-muted-foreground mt-1">Заводские пломбы, защитные наклейки и маркировки должны быть сохранены. Повреждение пломб влечёт аннулирование гарантии.</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3 p-3 bg-secondary/30 rounded-lg">
                        <Shield className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                        <div>
                          <span className="font-medium">Сохранение товарного вида</span>
                          <p className="text-sm text-muted-foreground mt-1">Запчасть не должна иметь следов механических повреждений, царапин, вмятин, полученных после передачи покупателю.</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3 p-3 bg-secondary/30 rounded-lg">
                        <Shield className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                        <div>
                          <span className="font-medium">Правильная эксплуатация</span>
                          <p className="text-sm text-muted-foreground mt-1">Деталь должна использоваться по назначению. Гарантия не распространяется на повреждения, вызванные неправильным монтажом или эксплуатацией.</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3 p-3 bg-secondary/30 rounded-lg">
                        <Shield className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                        <div>
                          <span className="font-medium">Сохранение документации</span>
                          <p className="text-sm text-muted-foreground mt-1">Необходимо сохранить чек, гарантийный талон и упаковку до окончания гарантийного периода.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Важно */}
              <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-4">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-yellow-500 mt-0.5 shrink-0" />
                  <div>
                    <span className="font-medium text-yellow-500">Важно!</span>
                    <p className="text-sm text-muted-foreground mt-1">
                      При обнаружении неисправности свяжитесь с нами в течение гарантийного срока. 
                      Мы оперативно решим вопрос — заменим деталь или вернём деньги.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Modal Footer */}
            <div className="sticky bottom-0 bg-card border-t border-border p-6 flex flex-col sm:flex-row gap-3">
              <a 
                href="#contact" 
                onClick={() => setModalOpen(false)}
                className="flex-1"
              >
                <Button size="lg" className="w-full gradient-bg hover:scale-105 hover:shadow-xl transition-all duration-300 ease-out">
                  Оставить заявку
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </a>
              <Button 
                size="lg" 
                variant="outline" 
                onClick={() => setModalOpen(false)}
                className="flex-1"
              >
                Закрыть
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="py-12 bg-card border-t border-border">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg gradient-bg flex items-center justify-center">
                  <Car className="w-6 h-6 text-white" />
                </div>
                <span className="text-xl font-bold">AutoMaster</span>
              </div>
              <p className="text-muted-foreground mb-4 max-w-md">
                Качественный ремонт автомобилей и безопасный подбор запчастей с защитой от мошенников. 
                Более 10 лет опыта и тысячи довольных клиентов.
              </p>
              <div className="flex gap-4">
                <a href="#" className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center hover:bg-primary transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                </a>
                <a href="#" className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center hover:bg-primary transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                </a>
                <a href="#" className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center hover:bg-primary transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z"/></svg>
                </a>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Услуги</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">Ремонт автомобилей</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Новые запчасти</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Б/у запчасти</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Подбор запчастей</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Информация</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">О компании</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Гарантии</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Доставка</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Политика конфиденциальности</a></li>
              </ul>
            </div>
          </div>
          
          <div className="pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">
              © 2024 AutoMaster. Все права защищены.
            </p>
            <p className="text-sm text-muted-foreground">
              Создано с ❤️ для автовладельцев
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

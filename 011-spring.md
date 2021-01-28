[Вопросы для собеседования](README.md)

# Spring
+ [Какие методы реализации принципа Инверсия управления (IoC) вы знаете?](#какие-методы-реализации-принципа-инверсия-управления-ioc-вы-знаете)
+ [Какими способами можно реализовать «внедрение зависимостей» в Java?](#какими-способами-можно-реализовать-внедрение-зависимостей-в-java)
+ [Что такое Spring?](#что-такое-spring)
+ [Какие основные отличия в версиях Spring?](#какие-основные-отличия-в-версиях-spring)
+ [В чем разница между Inversion of Control и Application Context?](#в-чем-разница-между-inversion-of-control-и-application-context)
+ [В чем различие между web.xml и the Spring Context - servlet.xml?](#в-чем-различие-между-webxml-и-the-spring-context-servletxml)
+ [Сравните Application Context, IoC Container, vs Web Container и EJB Container. Нужен ли Web Container для запуска Spring Boot приложения?](#сравните-application-context-ioc-container-vs-web-container-и-ejb-container-нужен-ли-web-container-для-запуска-spring-boot-приложения)
+ [Как происходит запуск IoC-контейнера Spring?](#как-происходит-запуск-ioc-контейнера-spring)
+ [Какие способы конфигурирование Spring существуют?](#какие-способы-конфигурирование-spring-существуют)
+ [Что предпочитаете использовать для конфигурации Spring?](#что-предпочитаете-использовать-для-конфигурации-spring)
+ [Что такое `BeanPostProcessor`?](#что-такое-beanpostprocessor)
+ [Для чего нужен Component Scan?](#для-чего-нужен-component-scan)
+ [В чём отличие между `@Component` и `@ComponentScan`?](#в-чём-отличие-между-component-и-componentscan)
+ [Для чего используется аннотация `@Bean`?](#для-чего-используется-аннотация-bean)
+ [В чём разница между `@Bean` и `@Component`?](#в-чём-разница-между-bean-и-component)
+ [В чём разница между `@Component`, `@Service` и `@Repository` аннотациями?](#в-чём-разница-между-component-service-и-repository-аннотациями)
+ [Можем ли мы использовать `@Component` вместо `@Service` для бизнес логики?](#можем-ли-мы-использовать-component-вместо-service-для-бизнес-логики)
+ [Можем ли мы применить `@Autowired` с не сеттерами и не конструкторами методами?](#можем-ли-мы-применить-autowired-с-не-сеттерами-и-не-конструкторами-методами)
+ [В чем разница между Сквозной Функциональностью (Cross Cutting Concerns) и АОП (аспектно ориентированное программирование)?](#в-чем-разница-между-сквозной-функциональностью-cross-cutting-concerns-и-аоп-аспектно-ориентированное-программирование)
+ [Почему возвращаемое значение при применении аспекта `@Around` может потеряться? Назовите причины.](#почему-возвращаемое-значение-при-применении-аспекта-around-может-потеряться-назовите-причины)
+ [Как вы решаете какой бин внедрить, если у вас несколько подходящих бинов. Расскажите о `@Primary` и `@Qualifier`?](#как-вы-решаете-какой-бин-внедрить-если-у-вас-несколько-подходящих-бинов-расскажите-о-primary-и-qualifier)
+ [Как вы добавите Component Scan в Spring Boot?](#как-вы-добавите-component-scan-в-spring-boot)
+ [Какие возможности предоставляет аннотация `@Controller`?](#какие-возможности-предоставляет-аннотация-controller)
+ [В чём разница между `@Controller` и `@RestController`?](#в-чём-разница-между-controller-и-restcontroller)
+ [Как мы можем выбрать подходящий бин при помощи application.properties?](#как-мы-можем-выбрать-подходящий-бин-при-помощи-applicationproperties)
+ [Почему иногда мы используем `@ResponseBody`, а иногда `ResponseEntity`?](#почему-иногда-мы-используем-responsebody-а-иногда-responseentity)
+ [В чем разница между Filters, Listeners and Interceptors?](#в-чем-разница-между-filters-listeners-and-interceptors)
+ [В чем разница между `ModelMap` и `ModelAndView`?](#в-чем-разница-между-modelmap-и-modelandview)
+ [В чем разница между `model.put()` и `model.addAttribute()`?](#в-чем-разница-между-modelput-и-modeladdattribute)
+ [Что можете рассказать про Form Binding?](#что-можете-рассказать-про-form-binding)
+ [Почему мы используем Hibernate Validator?](#почему-мы-используем-hibernate-validator)
+ [Где должны располагаться статические (css, js, html) ресурсы в Spring MVC приложении?](#где-должны-располагаться-статические-css-js-html-ресурсы-в-spring-mvc-приложении)
+ [Можно ли передать в запросе один и тот же параметр несколько раз?](#можно-ли-передать-в-запросе-один-и-тот-же-параметр-несколько-раз)

## Какие методы реализации принципа Инверсия управления (IoC) вы знаете?
+ __Шаблон «Фабрика» (англ. Factory pattern)__
+ __Локатор служб__
+ __Внедрение зависимости (англ. Dependency injection)__
+ __Контекстный поиск (англ. contextualized lookup)__

[к оглавлению](#Spring)

## Какими способами можно реализовать «внедрение зависимостей» в Java?
+ __Через конструктор__
+ __Через getter/setter__
+ __C помощью механизмов рефлексии__

[к оглавлению](#Spring)

## Что такое Spring?
__Spring Framework (или коротко Spring)__ - универсальный фреймворк с открытым исходным кодом для Java-платформы. Центральной частью Spring является контейнер Inversion of Control, который предоставляет средства конфигурирования и управления объектами Java с помощью рефлексии. Контейнер отвечает за управление жизненным циклом объекта: создание объектов, вызов методов инициализации и конфигурирование объектов путём связывания их между собой.

Spring имеет множество дочерних под проектов, в том числе:
+ _Data_ - для работы с хранилищами данных.
+ _MVC_ - для создания веб приложений.
+ _Boot_ - для быстрой компоновки и создания приложения на основе других Spring проектов.
+ _Cloud_ - для создания распределённой приложений.

[к оглавлению](#Spring)

## Какие основные отличия в версиях Spring?
+ __Версия 3 (2009)__ - Поддержка Java 5 (annotations, generics, varargs, ...).
+ __Версия 4 (2016)__ - Поддержка Java 8 (lambda, stream api, ...).
+ __Версия 5 (2017)__ - Построен на основе `Reactive Streams`.

## В чем разница между Inversion of Control и Application Context?
_IoC_ — инверсия управления. Вместо ручного внедрения зависимостей, фреймворк забирает ответственность за это.
_ApplicationContext_ — реализация IoC в Spring.
_Bean Factory_ — это базовая версия IoC контейнера
_Application Context_ также включает дополнительные функции, которые обычно нужны для разработки корпоративных приложений

[к оглавлению](#Spring)

## В чем различие между web.xml и the Spring Context - servlet.xml?
web.xml — Метаданные и конфигурация любого веб-приложения, совместимого с Java EE. Java EE стандарт для веб-приложений.
servlet.xml — файл конфигурации, специфичный для Spring Framework.

[к оглавлению](#Spring)

## Сравните Application Context, IoC Container, vs Web Container и EJB Container. Нужен ли Web Container для запуска Spring Boot приложения?
Web Container и EJB Containers являются частью приложения/веб-сервера, таких как Tomcat, Websphere, Weblogic. Они добавляют свою дополнительную функциональность к ним. Java EE определяет контракт для веб-приложений, эти контейнеры являются реализацией этих контрактов.

Spring контейнер может являться частью любого приложения, которое вы делаете на java. Spring может работать внутри веб-контейнера, ejb контейнера или даже без них.

[к оглавлению](#Spring)

## Как происходит запуск IoC-контейнера Spring?
1. __Парсинг конфигурации и создание BeanDefinition__ - конфигурация с помощью XNL, аннотаций, JavaConfig.
2. __Настройка созданных BeanDefinition__ - на данном этапе происходит настройка еще не созданных бинов через классы, реализующие `BeanFactoryPostProcessor`. Например, `PropertySourcesPlaceholderConfigurer`
3. __Создание кастомных FactoryBean__ - `FactoryBean` — это generic интерфейс, которому можно делегировать процесс создания бинов.
4. __Создание экземпляров бинов__  - созданием экземпляров бинов занимается `BeanFactory` при этом, если нужно, делегирует это кастомным `FactoryBean`. Экземпляры бинов создаются на основе ранее созданных `BeanDefinition`.
5. __Настройка созданных бинов__ - Интерфейс `BeanPostProcessor` позволяет вклиниться в процесс настройки ваших бинов до того, как они попадут в контейнер. Интерфейс несет в себе несколько методов.

[к оглавлению](#Spring)

## Какие способы конфигурирование Spring существуют?
+ __XML конфигурация__ — `ClassPathXmlApplicationContext(“context.xml”)`. Используется класс — `XmlBeanDefinitionReader`, который реализует интерфейс `BeanDefinitionReader`. Тут все достаточно прозрачно. `XmlBeanDefinitionReader` получает InputStream и загружает Document через `DefaultDocumentLoader`. Далее обрабатывается каждый элемент документа и если он является бином, то создается `BeanDefinition` на основе заполненных данных (id, name, class, alias, init-method, destroy-method и др.). Каждый `BeanDefinition` помещается в Mindmap. Mindmap хранится в классе `DefaultListableBeanFactory`.

+ __Аннотация/JavaConfig__ — с указанием пакета для сканирования — `AnnotationConfigApplicationContext(“package.name”)` или  через аннотации с указанием класса (или массива классов) помеченного аннотацией `@Configuration` - `AnnotationConfigApplicationContext(JavaConfig.class)`. Внутри `AnnotationConfigApplicationContext`, то можно увидеть два поля.

````java
    private final AnnotatedBeanDefinitionReader reader;

    private final ClassPathBeanDefinitionScanner scanner;
````

`ClassPathBeanDefinitionScanner` сканирует указанный пакет на наличие классов помеченных аннотацией @Component (или любой другой аннотацией которая включает в себя `@Component`). Найденные классы разбираются и для них создаются BeanDefinition. Чтобы сканирование было запущено, в конфигурации должен быть указан пакет для сканирования. @ComponentScan({"package.name"}) или <context:component-scan base-package="package.name"/>

`AnnotatedBeanDefinitionReader` работает в несколько этапов. Первый этап — это регистрация всех `@Configuration` для дальнейшего разбора. Если в конфигурации используются Conditional, то будут зарегистрированы только те конфигурации, для которых Condition вернет true. Аннотация Conditional появилась в четвертой версии Spring. Она используется в случае, когда на момент поднятия контекста нужно решить, создавать бин/конфигурацию или нет. Причем решение принимает специальный класс, который обязан реализовать интерфейс Condition. Второй этап — это регистрация специального `BeanFactoryPostProcessor`, а именно `BeanDefinitionRegistryPostProcessor`, который при помощи класса `ConfigurationClassParser` разбирает JavaConfig и создает BeanDefinition.

+ __Groovy конфигурация__ — `GenericGroovyApplicationContext(“context.groovy”)`. Данная конфигурация очень похожа на конфигурацию через Xml, за исключением того, что в файле не XML, а Groovy. Чтением и анализом groovy конфигурации занимается класс GroovyBeanDefinitionReader.

[к оглавлению](#Spring)

## Что предпочитаете использовать для конфигурации Spring?
Предпочитаю аннотации, если кодовая база хорошо описывается такими элементами, как `@Service`, `@Component`, `@Autowired`
Однако когда дело доходит до конфигурации, у меня нет каких-либо предпочтений. Я бы оставил этот вопрос команде.

[к оглавлению](#Spring)

## Что такое `BeanPostProcessor`?
Интерфейс `BeanPostProcessor` позволяет вклиниться в процесс настройки ваших бинов до того, как они попадут в контейнер. Интерфейс несет в себе несколько методов.

````java
public interface BeanPostProcessor {
    Object postProcessBeforeInitialization(Object bean, String beanName) throws BeansException;

    Object postProcessAfterInitialization(Object bean, String beanName) throws BeansException;
}
````

Оба метода вызываются для каждого бина. У обоих методов параметры абсолютно одинаковые. Разница только в порядке их вызова. Первый вызывается до init-метода, второй, после. Важно понимать, что на данном этапе экземпляр бина уже создан и идет его дополнительная настройка. Тут есть два важных момента:
+ Оба метода в итоге должны вернуть бин. Если в методе вы вернете null, то при получении этого бина из контекста вы получите null, а поскольку через `BeanPostProcessor` проходят все бины, после поднятия контекста, при запросе любого бина вы будете получать фиг, в смысле null.
+ Если вы хотите сделать прокси над вашим объектом, то имейте ввиду, что это принято делать после вызова init метода, иначе говоря это нужно делать в методе `postProcessAfterInitialization`.

Процесс дополнительной настройки показан на рисунке ниже. Порядок в котором будут вызваны BeanPostProcessor не известен, но мы точно знаем что выполнены они будут последовательно.

[к оглавлению](#Spring)

## Для чего нужен Component Scan?
Первый шаг для описания Spring Beans это добавление аннотации — `@Component`, или `@Service`, или `@Repository`. Однако Spring ничего не знает об этих бинах, если он не знает где искать их. То, что скажет Spring где искать эти бины и называется Component Scan. В `@ComponentScan` вы указываете пакеты, которые должны сканироваться. Spring будет искать бины не только в пакетах для сканирования, но и в их подпакетах.

[к оглавлению](#Spring)

## В чём отличие между `@Component` и `@ComponentScan`?
`@Component` помечает класс в качестве кандидата для создания Spring бина.
`@ComponentScan` указывает где Spring искать классы, помеченные аннотацией @Component или его производной

[к оглавлению](#Spring)

## Для чего используется аннотация `@Bean`?
В классах конфигурации Spring, @Bean используется для определения компонентов с кастомной логикой.

[к оглавлению](#Spring)

## В чём разница между `@Bean` и `@Component`?
`@Bean` используется в конфигурационных классах Spring. Он используется для непосредственного создания бина.
`@Component` используется со всеми классами, которыми должен управлять Spring. Когда Spring видит класс с `@Component`, Spring определяет этот класс как кандидата для создания bean.

[к оглавлению](#Spring)

## В чём разница между `@Component`, `@Service` и `@Repository` аннотациями?
Все они определяют бины Spring. Однако между ними всё же есть разница.

`@Component` — универсальный компонент
`@Repository` — компонент, который предназначен для хранения, извлечения и поиска. Как правило, используется для работы с базами данных.
`@Service` — фасад для некоторой бизнес логики

Пользовательские аннотации, производные от @Component, могут добавлять специальную логику в бинах.
Например, бины, получившиеся при помощи @Repository, дополнительно имеют обработку для JDBC Exception

[к оглавлению](#Spring)

## Можем ли мы использовать `@Component` вместо `@Service` для бизнес логики?
Если `@Component` является универсальным стереотипом для любого Spring компонента, то `@Service` в настоящее время является его псевдонимом. Однако в официальной документации Spring рекомендуется использовать именно `@Service` для бизнес логики. Вполне возможно, что в будущих версиях фреймворка, для данного стереотипа добавится дополнительная семантика, и его бины станут обладать дополнительной логикой.

[к оглавлению](#Spring)

## Можем ли мы применить `@Autowired` с не сеттерами и не конструкторами методами?
`@Autowired` может использоваться вместе с конструкторами, сеттерами или любым другими методами. Когда Spring находит `@Autowired` на методе, Spring автоматически вызовет этот метод, после создания экземпляра бина. В качестве аргументов, будут подобраны подходящие объекты из контекста Spring.

[к оглавлению](#Spring)

## В чем разница между Сквозной Функциональностью (Cross Cutting Concerns) и АОП (аспектно ориентированное программирование)?
Сквозная Функциональность — функциональность, которая может потребоваться вам на нескольких различных уровнях — логирование, управление производительностью, безопасность и т.д.
АОП — один из подходов к реализации данной проблемы

[к оглавлению](#Spring)

## Почему возвращаемое значение при применении аспекта `@Around` может потеряться? Назовите причины.
Метод, помеченный аннотацией @Around, должен возвращать значение, которое он (метод) получил из joinpoint.proceed()

````java
@Around("trackTimeAnnotation()")
public Object around(ProceedingJoinPoint joinPoint) throws Throwable{
    long startTime = System.currentTimeMillis();
    Object retVal = joinPoint.proceed();
    long timeTaken = System.currentTimeMillis() - startTime;
    logger.info("Time taken by {} is equal to {}",joinPoint, timeTaken);
    return retVal;
}
````

[к оглавлению](#Spring)

## Как вы решаете какой бин внедрить, если у вас несколько подходящих бинов. Расскажите о `@Primary` и `@Qualifier`?
Если есть бин, который вы предпочитаете большую часть времени по сравнению с другими, то используйте `@Primary`, и используйте `@Qualifier` для нестандартных сценариев.

Если все бины имеют одинаковый приоритет, мы всегда будем использовать `@Qualifier`

Если бин надо выбрать во время исполнения программы, то эти аннотации вам не подойдут. Вам надо в конфигурационном классе создать метод, пометить его аннотацией `@Bean`, и вернуть им требуемый бин.

[к оглавлению](#Spring)

## Как вы добавите Component Scan в Spring Boot?
````java
@SpringBootApplication
public class Application {
    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }
}
````

`@SpringBootApplication` определяет автоматическое сканирование пакета, где находится класс Application.

[к оглавлению](#Spring)

## Какие возможности предоставляет аннотация `@Controller`?
`@Controller` - уточнение интерфейса `@Component`.  Экземпляр класса, помеченного такой аннотация, также становиться бином в Spring.
Используется для указание точек взаимодействия с приложением в Spring MVC. Обычно используется с аннотацией `@RequestMapping`.

[к оглавлению](#Spring)

## В чём разница между `@Controller` и `@RestController`?
`@RestController` = `@Controller` + `@ResponseBody`

`@RestController` превращает помеченный класс в Spring-бин. Этот бин для конвертации входящих/исходящих данных использует Jackson message converter. Как правило целевые данные представлены в json или xml.

[к оглавлению](#Spring)

## Как мы можем выбрать подходящий бин при помощи application.properties?
Рассмотрим пример:

````java
interface GreetingService {
    public String sayHello();
}
````

и два компонента

````java
@Component(value="real")
class RealGreetingService implements GreetingService {
    public String sayHello() {
        return "I'm real";
    }
}
````

````java
@Component(value="mock")
class MockGreetingService implements GreetingService {
    public String sayHello() {
        return "I'm mock";
    }
}
````

Тогда в application.properties добавим свойство application.greeting: `real`

Воспользуемся данным решением:

````java
@RestController
public class WelcomeController {
    @Resource(name="${application.greeting}")
    private GreeterService service1;
}
````

[к оглавлению](#Spring)

## Почему иногда мы используем `@ResponseBody`, а иногда `ResponseEntity`?
ResponseEntity необходим, только если мы хотим кастомизировать ответ, добавив к нему статус ответа. Во всех остальных случаях будем использовать `@ResponseBody`.

````java
@GetMapping(value=”/resource”)
@ResponseBody
public Resource sayHello() { return resource; }

@PostMapping(value=”/resource”)
public ResponseEntity createResource() {
    ….
    return ResponseEntity.created(resource).build();
}
````
Стандартные HTTP коды статусов ответов, которые можно использовать.
200 — SUCCESS
201 — CREATED
404 — RESOURCE NOT FOUND
400 — BAD REQUEST
401 — UNAUTHORIZED
500 — SERVER ERROR

Для `@ResponseBody` единственные состояния статуса это SUCCESS(200), если всё хорошо и SERVER ERROR(500), если произошла какая-либо ошибка.

Допустим мы что-то создали и хотим отправить статус CREATED(201). В этом случае мы используем `ResponseEntity`.

[к оглавлению](#Spring)

## В чем разница между Filters, Listeners and Interceptors?
Концептуально всё просто, фильтры сервлетов могут перехватывать только HTTPServlets. Listeners могут перехватывать специфические события. Как перехватить события которые относятся ни к тем не другим?

Фильтры и перехватчики делают по сути одно и тоже: они перехватывают какое-то событие, и делают что-то до или после. Java EE использует термин Filter, Spring называет их Interceptors. Именно здесь AOP используется в полную силу, благодаря чему возможно перехватывание вызовов любых объектов.

[к оглавлению](#Spring)

## В чем разница между `ModelMap` и `ModelAndView`?
Model — интерфейс, ModelMap его реализация. ModelAndView является контейнером для пары, как ModelMap и View. Обычно я люблю использовать ModelAndView. Однако есть так же способ когда мы задаем необходимые атрибуты в ModelMap, и возвращаем название View обычной строкой из метода контроллера.

[к оглавлению](#Spring)

## В чем разница между `model.put()` и `model.addAttribute()`?
Метод addAttribute отделяет нас от работы с базовой структурой hashmap. По сути addAttribute это обертка над put, где делается дополнительная проверка на null. Метод addAttribute в отличие от put возвращает modelmap.

````java
model.addAttribute(“attribute1”,”value1”).addAttribute(“attribute2”,”value2”);
````

[к оглавлению](#Spring)

## Что можете рассказать про Form Binding?
Нам это может понадобиться, если мы, например, захотим взять некоторое значение с HTML  страницы и сохранить его в БД. Для этого нам надо это значение переместить в контроллер Spring. Если мы будем использовать Spring MVC form tags, Spring автоматически свяжет переменные на HTML странице с бином Spring.

[к оглавлению](#Spring)

## Почему мы используем Hibernate Validator?
Hibernate Validator никак не связан с БД. Это просто библиотека для валидации. Hibernate Validator версии 5.x является эталонной реализацией Bean Validation 1.1

Так же если взглянуть по адресу http://beanvalidation.org/2.0, то Hibernate Validator является единственным, который сертифицирован.

[к оглавлению](#Spring)

## Где должны располагаться статические (css, js, html) ресурсы в Spring MVC приложении?
Расположение статических ресурсов можно настроить. В документации Spring Boot рекомендуется использовать /static, или /public, или /resources, или /META-INF/resources.

[к оглавлению](#Spring)

## Можно ли передать в запросе один и тот же параметр несколько раз?
Пример: `http://localhost:8080/login?name=Ranga&name=Ravi&name=Sathish`
Да, можно принять все значения, используя массив в методе контроллера

````java
public String method(@RequestParam(value="name") String[] names){
}
````

[к оглавлению](#Spring)

# Источники
+ [Википедия](https://ru.wikipedia.org/)
+ [Хабрахабр](https://habr.com/ru/post/222579/)

[Вопросы для собеседования](README.md)
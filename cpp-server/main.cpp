// Only for test purposes

// #include <iostream>
// #include <cpprest/http_listener.h>
// #include <cpprest/json.h>

// using namespace web;
// using namespace web::http;
// using namespace web::http::experimental::listener;

// void helloHandler(const http_request& request)
// {
//     json::value response;
//     response[U("message")] = json::value::string(U("Hello, World!"));

//     http_response httpResponse(status_codes::OK);
//     httpResponse.headers().add(U("Content-Type"), U("application/json"));
//     httpResponse.set_body(response);

//     request.reply(httpResponse);
// }

// int main()
// {
//     utility::string_t address = U("http://localhost:2000");
//     http_listener listener(address);

//     listener.support(methods::GET, [](const http_request& request) {
//         helloHandler(request);
//     });

//     try
//     {
//         listener.open().wait();
//         std::cout << "Listening on " << address << std::endl;
//         std::cout << "Press Enter to exit..." << std::endl;
//         std::string line;
//         std::getline(std::cin, line);
//         listener.close().wait();
//     }
//     catch (const std::exception& ex)
//     {
//         std::cout << "Exception: " << ex.what() << std::endl;
//     }

//     return 0;
// }

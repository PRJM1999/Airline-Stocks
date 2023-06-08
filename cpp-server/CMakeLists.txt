# Set OPENSSL_ROOT_DIR
set(OPENSSL_ROOT_DIR "/opt/homebrew/opt/openssl@3")

cmake_minimum_required(VERSION 3.5)
project(AirlineStocksServer)

include(CTest)
enable_testing()

find_package(OpenSSL REQUIRED)

find_package(cpprestsdk REQUIRED)

# Set C++11 as the required standard
set(CMAKE_CXX_STANDARD 11)
set(CMAKE_CXX_STANDARD_REQUIRED ON)

# Specify the source files
set(SOURCE_DIR src)
set(ALL_FILES
    ${SOURCE_DIR}/black_scholes.cpp
    ${SOURCE_DIR}/monte_carlo.cpp
)


# Specify the header files
set(HEADER_FILES
    include/black_scholes.hpp
    include/monte_carlo_option.hpp
)

# Add the executable
add_executable(AirlineStocksServer ${ALL_FILES} ${HEADER_FILES})

# Link the required libraries
target_link_libraries(AirlineStocksServer PRIVATE cpprestsdk::cpprest OpenSSL::SSL OpenSSL::Crypto)

set(CPACK_PROJECT_NAME ${PROJECT_NAME})
set(CPACK_PROJECT_VERSION ${PROJECT_VERSION})
include(CPack)



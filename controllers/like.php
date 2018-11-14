<?php

function errorHandler($severity = false, $message = false, $file = false, $line = false)
{
    if (!in_array($severity, [E_WARNING, E_NOTICE])) {
        throw new ErrorException($message, 0, $severity, $file, $line);
    }
}

// any request to this file will trigger a like

// todo ip + useragent multiple submit

$filename = __DIR__ . DIRECTORY_SEPARATOR . 'db' . DIRECTORY_SEPARATOR . 'db.csv';

$currentlyOpen = false;

// validate input

$lockDir = __DIR__ . DIRECTORY_SEPARATOR . 'locks' . DIRECTORY_SEPARATOR . 'dblock';

function isLocked(): bool {

    var_dump($lockDir);

/*
    try {
       $res = mkdir($lockDir);
var_dump($res);
    } catch (\Throwable $e) {
        var_dump($e->getMessage());
    }*/
}

isLocked();




package com.ssafy.domain.heritage.repository;

import com.ssafy.domain.heritage.entity.Heritage;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

import static org.antlr.v4.runtime.tree.xpath.XPath.findAll;
import static org.junit.jupiter.api.Assertions.*;
@SpringBootTest
class HeritageRepositoryTest {

    @Autowired
    HeritageRepository repo;

    @Test
    public void testSelectAll(){
        List<Heritage> list = repo.findAll();

        for(Heritage heri : list){
            System.out.println(heri.getHeritageId());
            System.out.println(heri.getEra());
            System.out.println(heri.getHeritageName());
            System.out.println(heri.getHeritageContent());
        }
    }
}